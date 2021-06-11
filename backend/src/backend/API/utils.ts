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
      let { id, message }: { id: string; message: API.BE_MESSAGES } = msg;

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

export function send(name, args) {
  console.log(`[BE] send: ${name} | ${JSON.stringify(args)}`);
  ipcModule.server.broadcast(
    'message',
    JSON.stringify({ type: 'push', name, args })
  );
}
