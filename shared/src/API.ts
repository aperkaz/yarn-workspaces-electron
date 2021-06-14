import { TodoType } from './types';

export const CHANNEL = 'taggr-message-passing';

// BE

export namespace BE {
  export enum Types {
    ADD_TODO_SYNC = 'ADD_TODO_SYNC',
    ADD_TODO_ASYNC = 'ADD_TODO_ASYNC'
  }

  type ADD_TODO_SYNC = {
    type: Types.ADD_TODO_SYNC;
    payload: TodoType;
  };

  type ADD_TODO_ASYNC = {
    type: Types.ADD_TODO_ASYNC;
    payload: TodoType;
  };

  export type Messages = ADD_TODO_SYNC | ADD_TODO_ASYNC;

  export type MessageReturnTypes<T> = T extends ADD_TODO_SYNC
    ? boolean
    : T extends ADD_TODO_ASYNC
    ? Promise<void>
    : never;

  export type MessageHandlers = {
    [BE.Types.ADD_TODO_SYNC]: () => boolean;
    [BE.Types.ADD_TODO_ASYNC]: () => Promise<void>;
  };
}

// FE

export namespace FE {
  export enum Types {
    ADD_TODO = 'ADD_TODO'
  }

  type ADD_TODO = {
    type: Types.ADD_TODO;
    payload: TodoType;
  };

  export type Messages = ADD_TODO;

  export type Handlers = {
    ADD_TODO: (message: ADD_TODO) => void;
  };

  export type MessageReturnTypes<T> = void;

  export type MessageHandlers = {
    [FE.Types.ADD_TODO]: () => void;
  };
}
