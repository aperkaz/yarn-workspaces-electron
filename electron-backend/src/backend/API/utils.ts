import ipcModule from 'node-ipc';

import { API } from '@app/shared';

import handlers from './handlers';

type HandlersType = typeof handlers;

export function init(socketName: string, handlers: HandlersType) {
  ipcModule.config.id = socketName;
  ipcModule.config.silent = true;

  ipcModule.serve(() => {
    ipcModule.server.on('message', (stringMessage, socket) => {
      let msg = JSON.parse(stringMessage);
      let { id, message }: { id: string; message: API.BE.Messages } = msg;

      if (handlers.message) {
        handlers.message(message).then(
          (result) => {
            ipcModule.server.emit(
              socket,
              'message',
              JSON.stringify({ type: 'reply', id, result })
            );
          },
          (error) => {
            // Up to you how to handle errors, if you want to forward
            // them, etc
            ipcModule.server.emit(
              socket,
              'message',
              JSON.stringify({ type: 'error' })
            );
            throw error;
          }
        );
      } else {
        console.warn('BE ipc-handler not available');
        ipcModule.server.emit(
          socket,
          'message',
          JSON.stringify({ type: 'reply', result: null })
        );
      }
    });
  });

  ipcModule.server.start();
}

/**
 * Send message to FE through node-ipc
 */
export function send<T extends API.FE.Messages>(message: T) {
  const { type, payload } = message;

  console.log(`[BE] sends message: ${type} | ${JSON.stringify(payload)}`);
  ipcModule.server.broadcast(
    'message',
    JSON.stringify({ type: 'push', name: 'message', message })
  );
}
