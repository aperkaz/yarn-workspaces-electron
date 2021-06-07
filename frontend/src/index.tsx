import React from 'react';
import ReactDOM from 'react-dom';

import { add } from '@app/shared';

import reportWebVitals from './reportWebVitals';

console.log('HELLO FE');

ReactDOM.render(
  <React.StrictMode>
    <div>MY NAME IS SUSAN {add(1, 1)}</div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
