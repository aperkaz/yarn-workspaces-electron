import { API } from '@app/shared';
import { send } from './utils';

const router: API.BE.MessageHandlers = {
  ADD_TODO_SYNC: () => {
    console.log(`[BE] Added todo sync`);
    return true;
  },
  ADD_TODO_ASYNC: async () => {
    console.log(`[BE] Added todo async`);
    await new Promise((r) => setTimeout(r, 1000));

    // node-ipc to FE
    send({
      type: API.FE.Types.ADD_TODO,
      payload: {
        isDone: false,
        text: `${new Date().toUTCString()} - todo from BE`
      }
    });
  }
};

async function messageHander(message: API.BE.Messages) {
  console.log(`[BE] receive, type: ${message.type}`);
  console.log(`[BE] receive, payload: ${JSON.stringify(message.payload)}`);

  if (!router[message.type]) {
    return Promise.reject(`[BE] unhanded message type: ${message.type}`);
  }

  return await router[message.type]();
}

export default {
  _history: [],
  message: messageHander
};
