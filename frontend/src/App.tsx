import React from 'react';

import { API } from '@app/shared';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/utils';
import TodoList from './TodoList';

const App = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((s) => s.todos);

  const handleAddTodoSync = async () => {
    const newTodo = {
      text: `${new Date().toUTCString()} - a sync todo`,
      isDone: false
    };

    // send todo to BE
    const isAdded = await send({
      type: API.MessageType.BE_ADD_TODO_SYNC,
      payload: newTodo
    });

    // add todo to REDUX
    dispatch(ACTIONS.addTodo(newTodo));

    console.log('Sync todo added: ', isAdded);
  };

  const handleAddTodoAsync = async () => {
    const newTodo = {
      text: `${new Date().toUTCString()} - an async todo`,
      isDone: false
    };

    // send todo to BE
    await send({
      type: API.MessageType.BE_ADD_TODO_ASYNC,
      payload: newTodo
    });

    // The BE will send a message updating the Todos once ready
  };

  return (
    <div>
      <h1>Todos</h1>
      <br />
      <TodoList
        todos={todos}
        handleAddTodoSync={handleAddTodoSync}
        handleAddTodoAsync={handleAddTodoAsync}
      />
    </div>
  );
};

export default App;
