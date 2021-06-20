import { TodoType } from './types';

export const CHANNEL = 'taggr-message-passing';

// BE

export namespace BE {
  /**
   * Message types
   */
  export type Types = keyof MessageHandler;

  export type MessageHandler = {
    ADD_TODO_SYNC: ({
      type,
      payload
    }: {
      type: 'ADD_TODO_SYNC';
      payload: TodoType;
    }) => boolean;
    ADD_TODO_ASYNC: ({
      type,
      payload
    }: {
      type: 'ADD_TODO_ASYNC';
      payload: TodoType;
    }) => Promise<boolean>;
  };

  export type Messages =
    | Parameters<MessageHandler['ADD_TODO_SYNC']>[0]
    | Parameters<MessageHandler['ADD_TODO_ASYNC']>[0];
}

// FE

export namespace FE {
  export type Types = keyof MessageHandler;

  export type MessageHandler = {
    ADD_TODO: ({
      type,
      payload
    }: {
      type: 'ADD_TODO';
      payload: TodoType;
    }) => void;
  };

  export type Messages = Parameters<MessageHandler['ADD_TODO']>[0];
}
