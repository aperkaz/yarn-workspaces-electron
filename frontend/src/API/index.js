/**
 * Available actions to execute over the backend.
 * Communication with message passing over node-ipc sockets.
 *
 * Background handlers: electron/src/server/server-handlers
 */
import { send } from './helpers';
import './handlers'; // registers handlers

// TODONOW: add read services

/**
 * Filter images based on filter. The backend will send messages once the computation is complete.
 * @param {Object} filters {projectRootFolderPath: Object}
 */
export const serviceFilterImages = (filters) => {
  send('filter-images', filters);
};
