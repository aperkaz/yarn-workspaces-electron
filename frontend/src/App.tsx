import React from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/utils';
import TodoList from './TodoList';

const App = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((s) => s.todos);

  const handleAddTodoSync = async () => {
    const syncTodo = {
      text: `A sync todo`,
      isDone: false
    };

    // BE will update the redux store
    const isAdded = send({
      type: 'ADD_TODO_SYNC',
      payload: syncTodo
    });

    console.log('Sync todo added: ', isAdded);
  };

  const handleAddTodoAsync = async () => {
    const newTodo = {
      text: `An async todo`,
      isDone: false
    };

    // The BE will udpate the redux store
    const isAdded = await send({
      type: 'ADD_TODO_ASYNC',
      payload: newTodo
    });

    console.log('Async todo added: ', isAdded);
  };

  const handleReset = async () => {
    dispatch(ACTIONS.resetState());
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5rem'
      }}
    >
      <h1 style={{ marginTop: 0 }}>Todos</h1>
      <br />
      <TodoList
        todos={todos}
        handleAddTodoSync={handleAddTodoSync}
        handleAddTodoAsync={handleAddTodoAsync}
        handleReset={handleReset}
      />
    </div>
  );
};

export default App;
