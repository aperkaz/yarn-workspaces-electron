import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodoType } from '@app/shared';

interface InitialState {
  todos: TodoType[];
}

const initialState: InitialState = {
  todos: []
};

const stateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    resetState: () => initialState,
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    }
  }
});

export const ACTIONS = {
  ...stateSlice.actions
};

const store = configureStore({ reducer: stateSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
