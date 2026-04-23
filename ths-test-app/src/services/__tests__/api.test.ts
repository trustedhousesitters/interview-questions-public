import { get } from '../api';

const mockFetch = (response: Partial<Response> | Promise<never>) => {
  jest.spyOn(globalThis, 'fetch').mockImplementation(() =>
    response instanceof Promise ? response : Promise.resolve(response as Response),
  );
};

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('get', () => {
  it('returns ok:true with parsed JSON on 200', async () => {
    mockFetch({ ok: true, status: 200, json: async () => ({ id: '1', title: 'Test' }) });

    const result = await get<{ id: string; title: string }>('/listings/1');

    expect(result).toEqual({ ok: true, data: { id: '1', title: 'Test' } });
  });

  it('returns not_found on 404', async () => {
    mockFetch({ ok: false, status: 404, json: async () => ({}) });

    const result = await get('/listings/unknown');

    expect(result).toEqual({ ok: false, status: 'not_found' });
  });

  it('returns error on non-200 non-404 status', async () => {
    mockFetch({ ok: false, status: 500, json: async () => ({}) });

    const result = await get('/listings');

    expect(result).toEqual({ ok: false, status: 'error' });
  });

  it('returns error on network failure', async () => {
    mockFetch(Promise.reject(new TypeError('Network request failed')));

    const result = await get('/listings');

    expect(result).toEqual({ ok: false, status: 'error' });
  });

  it('returns error when request times out', async () => {
    jest.useFakeTimers();

    jest.spyOn(globalThis, 'fetch').mockImplementation((_url, options) =>
      new Promise((_, reject) => {
        (options as RequestInit).signal!.addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted.', 'AbortError'));
        });
      }),
    );

    const promise = get('/listings');
    jest.advanceTimersByTime(10_001);
    const result = await promise;

    expect(result).toEqual({ ok: false, status: 'error' });

    jest.useRealTimers();
  });
});
