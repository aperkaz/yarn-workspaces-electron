import React, { useEffect } from 'react';

import { User } from '@app/shared';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/helpers';

const Susan = new User('Susan', 31);

const App = () => {
  const dispatch = useAppDispatch();

  const counter = useAppSelector((s) => s.counter);

  return (
    <div>
      <div>{Susan.greet()}</div>
      <br />
      <div>Couter: {counter}</div>
      <button
        onClick={async () => {
          // TODONOW: clean up BE interface
          console.log(await send('ring-ring', null));

          dispatch(ACTIONS.incrementCounter());
        }}
      >
        increment
      </button>
    </div>
  );
};

export default App;
