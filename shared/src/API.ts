import { TodoType } from './types';

export const CHANNEL = 'taggr-message-passing';

export enum MessageType {
  // BE
  BE_ADD_TODO_SYNC = 'BE_ADD_TODO_SYNC',
  BE_ADD_TODO_ASYNC = 'BE_ADD_TODO_ASYNC',
  // FE
  FE_ADD_TODO = 'FE_ADD_TODO'
}

interface BE_ADD_TODO_SYNC {
  type: MessageType.BE_ADD_TODO_SYNC;
  payload: TodoType;
}

interface BE_ADD_TODO_ASYNC {
  type: MessageType.BE_ADD_TODO_ASYNC;
  payload: TodoType;
}

export type BE_MESSAGES = BE_ADD_TODO_SYNC | BE_ADD_TODO_ASYNC;

interface FE_ADD_TODO {
  type: MessageType.FE_ADD_TODO;
  payload: TodoType;
}

export type FE_MESSAGES = FE_ADD_TODO;
