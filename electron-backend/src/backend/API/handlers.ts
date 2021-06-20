import { API } from '@app/shared';
import { send } from './utils';

const router: API.BE.MessageHandler = {
  ADD_TODO_SYNC: (message) => {
    console.log(`[BE] Added todo sync`);

    send({
      type: 'ADD_TODO',
      payload: {
        isDone: message.payload.isDone,
        text: `[BE sync] - ${message.payload.text}`
      }
    });

    return true;
  },
  ADD_TODO_ASYNC: async (message) => {
    console.log(`[BE] Added todo async`);
    await new Promise((r) => setTimeout(r, 2000));

    send({
      type: 'ADD_TODO',
      payload: {
        isDone: message.payload.isDone,
        text: `[BE async] - ${message.payload.text}`
      }
    });

    return true;
  }
};

async function messageHander(message: API.BE.Messages) {
  console.log(`[BE] receive, type: ${message.type}`);
  console.log(`[BE] receive, payload: ${JSON.stringify(message.payload)}`);

  if (!router[message.type]) {
    return Promise.reject(`[BE] unhanded message type: ${message.type}`);
  }

  // @ts-ignore
  return await router[message.type](message);
}

export default {
  _history: [],
  message: messageHander
};
