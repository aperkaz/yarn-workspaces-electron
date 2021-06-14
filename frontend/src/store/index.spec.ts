import store, { ACTIONS } from './index';
import expect from 'expect';

describe('App reducer', () => {
  beforeEach(() => {
    store.dispatch(ACTIONS.resetState());
  });

  it('should return the initial state', () => {
    expect(store.getState()).toEqual({ todos: [] });
  });

  it('should add new todos', () => {
    const NEW_TODO = { text: 'Test todo', isDone: false };
    const NEW_TODO_2 = { text: 'Test todo2', isDone: false };

    expect(store.getState()).toEqual({ todos: [] });

    store.dispatch(ACTIONS.addTodo(NEW_TODO));

    expect(store.getState()).toEqual({
      todos: [NEW_TODO]
    });

    store.dispatch(ACTIONS.addTodo(NEW_TODO_2));

    expect(store.getState()).toEqual({
      todos: [NEW_TODO, NEW_TODO_2]
    });
  });

  it('should reset state', () => {
    const NEW_TODO = { text: 'Test todo', isDone: false };

    store.dispatch(ACTIONS.addTodo(NEW_TODO));

    expect(store.getState()).toEqual({
      todos: [NEW_TODO]
    });

    store.dispatch(ACTIONS.resetState());

    expect(store.getState()).toEqual({
      todos: []
    });
  });
});
