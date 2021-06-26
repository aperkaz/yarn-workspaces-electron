import store, { ACTIONS } from './index';
import expect from 'expect';

describe('App reducer', () => {
  beforeEach(() => {
    store.dispatch(ACTIONS.resetState());
  });

  it('should return the initial state', () => {
    expect(store.getState()).toEqual({ notifications: [] });
  });

  it('should add new notification', () => {
    const NOTIFICATION = { text: 'Test notification' };
    const NOTIFICATION_2 = { text: 'Test notification2' };

    expect(store.getState()).toEqual({ notifications: [] });

    store.dispatch(ACTIONS.addNotification(NOTIFICATION));

    expect(store.getState()).toEqual({
      notifications: [NOTIFICATION]
    });

    store.dispatch(ACTIONS.addNotification(NOTIFICATION_2));

    expect(store.getState()).toEqual({
      notifications: [NOTIFICATION, NOTIFICATION_2]
    });
  });

  it('should reset state', () => {
    const NOTIFICATION = { text: 'Test notification' };

    store.dispatch(ACTIONS.addNotification(NOTIFICATION));

    expect(store.getState()).toEqual({
      notifications: [NOTIFICATION]
    });

    store.dispatch(ACTIONS.resetState());

    expect(store.getState()).toEqual({
      notifications: []
    });
  });
});
