import handlers from './handlers';

jest.mock('./utils', () => ({
  send: jest.fn()
}));
import { send } from './utils';

describe('Message handlers', () => {
  it('should return true when processing PROCESS_IMAGE_ASYNC message', async () => {
    await expect(
      handlers.message({
        type: 'PROCESS_IMAGE_ASYNC'
      })
    ).resolves.toBe(true);
  });

  it('should process PROCESS_IMAGE_BATCH message', async () => {
    jest.useFakeTimers();

    const handlePromise = handlers.message({
      type: 'PROCESS_IMAGE_BATCH'
    });

    jest.runAllTimers(); // speed up timers

    await expect(handlePromise).resolves.toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('should reject when there is not handler registered', async () => {
    await expect(
      handlers.message({
        type: 'unhandled message' as any
      })
    ).rejects.toBe('[BE] unhanded message type: unhandled message');
  });
});
