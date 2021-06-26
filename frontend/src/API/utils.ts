import { API } from '@app/shared';

declare const window: any;

// Connection state
const replyHandlers = new Map();
const listeners = new Map();
let messageQueue: any = [];
let socketClient: any = null;

/**
 * Initialize the socket connection with the backend
 */
export async function initSocketToServer() {
  const socketName = await window.getServerSocket();
  connectSocket(socketName, () => {
    console.log('Connected!');
  });

  // register handlers
  require('./handlers');
}

/**
 * Connect to a given socket
 */
function connectSocket(name: string, onOpen: () => any) {
  window.ipcConnect(name, function (client: any) {
    client.on('message', (data: any) => {
      const msg = JSON.parse(data);

      if (msg.type === 'error') {
        // Up to you whether or not to care about the error
        const { id } = msg;
        replyHandlers.delete(id);
      } else if (msg.type === 'reply') {
        const { id, result } = msg;

        const handler = replyHandlers.get(id);
        if (handler) {
          replyHandlers.delete(id);
          handler.resolve(result);
        }
      } else if (msg.type === 'push') {
        const { message } = msg;

        const listens = listeners.get('message');
        if (listens) {
          listens.forEach((listener: (args: any) => void) => {
            listener(message);
          });
        }
      } else {
        throw new Error('Unknown message type: ' + JSON.stringify(msg));
      }
    });

    client.on('connect', () => {
      socketClient = client;

      // Send any messages that were queued while closed
      if (messageQueue.length > 0) {
        messageQueue.forEach((msg: any) => client.emit('message', msg));
        messageQueue = [];
      }

      onOpen();
    });

    client.on('disconnect', () => {
      socketClient = null;
    });
  });
}

/**
 * Send message to BE through node-ipc
 */
export function send<T extends API.BE.Messages>(
  message: T
): ReturnType<API.BE.MessageHandler[T['type']]> {
  const { type } = message;

  console.log(`[FE] sends message: ${type}`);

  return new Promise((resolve, reject) => {
    let id = window.uuid.v4();
    replyHandlers.set(id, { resolve, reject });
    if (socketClient) {
      socketClient.emit('message', JSON.stringify({ id, message }));
    } else {
      messageQueue.push(JSON.stringify({ id, message }));
    }
  }) as any;
}

/**
 * Registers handler for messages incomming fron backend socket
 */
export function registerHandler(name: string, callback: any) {
  if (!listeners.get(name)) {
    listeners.set(name, []);
  }
  listeners.get(name).push(callback);

  return () => {
    let arr = listeners.get(name);
    listeners.set(
      name,
      arr.filter((cb_: any) => cb_ !== callback)
    );
  };
}

export function unregisterHandler(name: string) {
  listeners.set(name, []);
}
