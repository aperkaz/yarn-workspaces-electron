import { configureStore, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  counter: number;
}

const initialState: InitialState = {
  counter: 0
};

const stateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    resetState: () => initialState,
    incrementCounter: (state) => {
      state.counter = state.counter + 1;
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
