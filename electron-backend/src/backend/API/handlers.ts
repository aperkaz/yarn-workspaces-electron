import sharp from 'sharp';

import { API } from '@app/shared';
import { send } from './utils';

const os = require('os');
sharp.concurrency(os.cpus() - 2);

/**
 * Example of native module. Generates an image.
 */
const processImage = async () => {
  console.log(`[BE] process image`);

  await sharp({
    create: {
      width: 8000,
      height: 8000,
      channels: 4,
      background: { r: 0, g: 255, b: 0, alpha: 0.5 }
    }
  })
    .toBuffer()
    .catch();
};

const router: API.BE.MessageHandler = {
  PROCESS_IMAGE_ASYNC: async () => {
    const start = new Date().getTime();
    await processImage();
    const end = new Date().getTime();

    send({
      type: 'ADD_NOTIFICATION',
      payload: {
        text: `[BE processed image] - ${end - start}ms`
      }
    });

    return true;
  },

  PROCESS_IMAGE_BATCH: async () => {
    console.log(`[BE] Process iamge batch`);

    const start = new Date().getTime();
    for (let i = 0; i < 10; i++) await processImage();
    const end = new Date().getTime();

    send({
      type: 'ADD_NOTIFICATION',
      payload: {
        text: `[BE processed x10 images] - ${end - start}ms`
      }
    });

    return true;
  }
};

/**
 * Message handlers, for notifications comming from the fronted
 */
async function messageHander(message: API.BE.Messages) {
  console.log(`[BE] receive, type: ${message.type}`);
  console.log(`[BE] receive, payload: ${JSON.stringify(message)}`);

  if (!router[message.type]) {
    return Promise.reject(`[BE] unhanded message type: ${message.type}`);
  }

  return await router[message.type](message as any);
}

export default {
  _history: [],
  message: messageHander
};
