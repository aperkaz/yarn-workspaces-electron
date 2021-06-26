import { NotificationType } from './types';

export const CHANNEL = 'taggr-message-passing';

// BE

export namespace BE {
  /**
   * Message types
   */
  export type Types = keyof MessageHandler;

  export type MessageHandler = {
    PROCESS_IMAGE_ASYNC: ({
      type
    }: {
      type: 'PROCESS_IMAGE_ASYNC';
    }) => Promise<boolean>;
    PROCESS_IMAGE_BATCH: ({
      type
    }: {
      type: 'PROCESS_IMAGE_BATCH';
    }) => Promise<boolean>;
  };

  export type Messages =
    | Parameters<MessageHandler['PROCESS_IMAGE_ASYNC']>[0]
    | Parameters<MessageHandler['PROCESS_IMAGE_BATCH']>[0];
}

// FE

export namespace FE {
  export type Types = keyof MessageHandler;

  export type MessageHandler = {
    ADD_NOTIFICATION: ({
      type,
      payload
    }: {
      type: 'ADD_NOTIFICATION';
      payload: NotificationType;
    }) => void;
  };

  export type Messages = Parameters<MessageHandler['ADD_NOTIFICATION']>[0];
}
