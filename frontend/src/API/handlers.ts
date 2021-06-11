import { API } from '@app/shared';

import store, { ACTIONS } from '../store';
import { registerHandler } from './utils';

/**
 * Message handlers, for messages comming from the backend
 */

registerHandler('message', (message: API.FE_MESSAGES) => {
  store.dispatch(ACTIONS.addTodo(message.payload));
});
