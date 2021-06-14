import { API } from '@app/shared';
import handlers from './handlers';

jest.mock('./utils', () => ({
  send: jest.fn()
}));
import { send } from './utils';

describe('Message handlers', () => {
  it('should return true when processing ADD_TODO_SYNC message', async () => {
    await expect(
      handlers.message({
        type: API.BE.Types.ADD_TODO_SYNC,
        payload: null
      })
    ).resolves.toBe(true);
  });

  it('should process ADD_TODO_ASYNC message', async () => {
    jest.useFakeTimers();

    const handlePromise = handlers.message({
      type: API.BE.Types.ADD_TODO_ASYNC,
      payload: { text: 'Test todo', isDone: true }
    });

    jest.runAllTimers(); // speed up timers

    await expect(handlePromise).resolves.toEqual(undefined);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('should reject when there is not handler registered', async () => {
    await expect(
      handlers.message({
        type: 'unhandled message' as any,
        payload: { text: 'Test todo', isDone: true }
      })
    ).rejects.toBe('[BE] unhanded message type: unhandled message');
  });
});
