import React from 'react';

import { entities, API } from '@app/shared';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/utils';

const SharedEntity = new entities.Person('Alain', 26);

const App = () => {
  const dispatch = useAppDispatch();

  const counter = useAppSelector((s) => s.counter);

  return (
    <div>
      <div>{SharedEntity.toString()}</div>
      <br />
      <div>Send messages to backend (check console for results)</div>
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
              type: API.MessageType.BE_SUM,
              payload: { a: 10, b: 10 }
            })
          );
        }}
      >
        async message
      </button>
      <br />
      <br />
      <div>Redux counter: {counter}</div>
      <button onClick={async () => dispatch(ACTIONS.incrementCounter())}>
        increment
      </button>
    </div>
  );
};

export default App;
