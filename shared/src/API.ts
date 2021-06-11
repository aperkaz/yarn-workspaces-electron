export const CHANNEL = 'taggr-message-passing';

export enum MessageType {
  // BE
  BE_GREET = 'BE_GREET',
  BE_SUM = 'BE_SUM',
  // FE
  FE_GREET = 'FE_GREET'
}

interface BE_GREET {
  type: MessageType.BE_GREET;
  payload: string;
}
interface BE_SUM {
  type: MessageType;
  payload: { a: number; b: number };
}

export type BE_MESSAGES = BE_GREET | BE_SUM;

interface FE_GREET {
  type: MessageType.FE_GREET;
  payload: string;
}

export type FE_MESSAGES = FE_GREET;
