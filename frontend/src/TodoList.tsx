import React from 'react';

import { TodoType } from '@app/shared';

type Props = {
  todos: TodoType[];
  handleAddTodoSync: () => void;
  handleAddTodoAsync: () => void;
};

const TodoList = ({ todos, handleAddTodoSync, handleAddTodoAsync }: Props) => (
  <div>
    <ul>
      {todos.map((todo, i) => (
        <li key={i}>{todo.text}</li>
      ))}
    </ul>
    <button onClick={handleAddTodoSync} style={{ marginRight: '5px' }}>
      add todo sync
    </button>
    <button onClick={handleAddTodoAsync}>add todo async</button>
  </div>
);

export default TodoList;
