import { API } from '@app/shared';

type Handlers = {
  _history: any[];
  message: (message: API.BE_MESSAGES) => any;
};

const messageHander = async (message: API.BE_MESSAGES) => {
  console.log(`[BE] receive, type: ${message.type}`);
  console.log(`[BE] receive, payload: ${JSON.stringify(message.payload)}`);

  try {
    switch (message.type) {
      case API.MessageType.BE_GREET:
        return `Greetings ${message.payload}!`;
      case API.MessageType.BE_SUM:
        await new Promise((r) => setTimeout(r, 1000));
        return message.payload.a + message.payload.b;
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
