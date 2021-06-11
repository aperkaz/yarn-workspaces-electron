import { API } from '@app/shared';
import { send } from './utils';

type Handlers = {
  _history: any[];
  message: (message: API.BE_MESSAGES) => any;
};

const messageHander = async (message: API.BE_MESSAGES) => {
  console.log(`[BE] receive, type: ${message.type}`);
  console.log(`[BE] receive, payload: ${JSON.stringify(message.payload)}`);

  try {
    switch (message.type) {
      case API.MessageType.BE_ADD_TODO_SYNC:
        console.log(`[BE] Added todo sync`);
        return true;
      case API.MessageType.BE_ADD_TODO_ASYNC:
        console.log(`[BE] Added todo async`);

        await new Promise((r) => setTimeout(r, 2000));

        // node-ipc to FE
        send({
          type: API.MessageType.FE_ADD_TODO,
          payload: {
            isDone: false,
            text: `${new Date().toUTCString()} - todo from BE`
          }
        });
        return;
    }
  } catch (err) {
    console.error(
      `[BE] message-handler: onmessage error. ${JSON.stringify(message)}`
    );
  }
};

export default {
  _history: [],
  message: messageHander
} as Handlers;
