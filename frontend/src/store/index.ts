import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotificationType } from '@app/shared';

interface InitialState {
  notifications: NotificationType[];
}

const initialState: InitialState = {
  notifications: []
};

const stateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    resetState: () => initialState,
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notifications.push(action.payload);
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
