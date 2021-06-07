import { User } from '@app/shared';

let handlers: any = {};

handlers._history = [];

handlers['ring-ring'] = async () => {
  const Alain = new User('Alain', 26);

  return Alain.greet();
};

module.exports = handlers;
