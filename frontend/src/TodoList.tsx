import React from 'react';

import { TodoType } from '@app/shared';

type Props = {
  todos: TodoType[];
  handleAddTodoSync: () => void;
  handleAddTodoAsync: () => void;
  handleReset: () => void;
};

const TodoList = ({
  todos,
  handleAddTodoSync,
  handleAddTodoAsync,
  handleReset
}: Props) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <button onClick={handleAddTodoSync}>add todo sync</button>
      <button onClick={handleAddTodoAsync}>add todo async (2s)</button>
      <button onClick={handleReset}>RESET</button>
    </div>

    <ul>
      {todos.map((todo, i) => (
        <li key={i}>{todo.text}</li>
      ))}
    </ul>
  </div>
);

export default TodoList;
