import handlers from './handlers';

jest.mock('./utils', () => ({
  send: jest.fn()
}));
import { send } from './utils';

describe('Message handlers', () => {
  it('should return true when processing ADD_TODO_SYNC message', async () => {
    await expect(
      handlers.message({
        type: 'ADD_TODO_SYNC',
        payload: { isDone: false, text: 'add todo sync' }
      })
    ).resolves.toBe(true);
  });

  it('should process ADD_TODO_ASYNC message', async () => {
    jest.useFakeTimers();

    const handlePromise = handlers.message({
      type: 'ADD_TODO_ASYNC',
      payload: { isDone: false, text: 'add todo async' }
    });

    jest.runAllTimers(); // speed up timers

    await expect(handlePromise).resolves.toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('should reject when there is not handler registered', async () => {
    await expect(
      handlers.message({
        type: 'unhandled message' as any,
        payload: false as any
      })
    ).rejects.toBe('[BE] unhanded message type: unhandled message');
  });
});
