import React from 'react';

import { User, API } from '@app/shared';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/utils';

const Susan = new User('Alain', 26);

console.log(API);

const App = () => {
  const dispatch = useAppDispatch();

  const counter = useAppSelector((s) => s.counter);

  return (
    <div>
      <div>Instance from shared module: {Susan.greet()}</div>
      <br />
      <div>Couter: {counter}</div>
      <button
        onClick={async () => {
          console.log(
            await send({
              type: API.MessageType.BE_GREET,
              payload: 'great coder'
            })
          );
          console.log(
            await send({
              type: API.MessageType.BE_COUNT,
              payload: { a: 10, b: 10 }
            })
          );

          dispatch(ACTIONS.incrementCounter());
        }}
      >
        increment
      </button>
    </div>
  );
};

export default App;
