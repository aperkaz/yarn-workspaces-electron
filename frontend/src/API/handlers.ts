import { API } from '@app/shared';

import store, { ACTIONS } from '../store';
import { registerHandler } from './utils';

const router: API.FE.MessageHandler = {
  ADD_NOTIFICATION: async (message) => {
    store.dispatch(ACTIONS.addNotification(message.payload));
  }
};

/**
 * Message handlers, for notifications comming from the backend
 */
registerHandler('message', async (message: API.FE.Messages) => {
  console.log(`[FE] receive, type: ${message.type}`);
  console.log(`[FE] receive, payload: ${JSON.stringify(message)}`);

  if (!router[message.type]) {
    return Promise.reject(`[FE] unhanded message type: ${message.type}`);
  }

  return await router[message.type](message as any);
});
