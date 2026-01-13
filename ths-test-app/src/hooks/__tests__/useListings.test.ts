import { renderHook, waitFor, act } from '@testing-library/react-native';
import { useListings } from '../useListings';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('useListings', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('returns initial state', () => {
    const { result } = renderHook(() => useListings());

    expect(result.current.listingData).toEqual([]);
    expect(result.current.listing).toBeNull();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.getAllListings).toBe('function');
    expect(typeof result.current.getListingById).toBe('function');
  });

  test('getAllListings fetches and updates listingData', async () => {
    const mockListings = [
      { id: '1', title: 'Listing 1' },
      { id: '2', title: 'Listing 2' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockListings,
    } as Response);

    const { result } = renderHook(() => useListings());

    act(() => {
      result.current.getAllListings();
    });

    await waitFor(() => {
      expect(result.current.listingData).toEqual(mockListings);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/listings');
  });

  test('getListingById fetches and updates listing on success', async () => {
    const mockListing = {
      id: '1',
      title: 'Test Listing',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockListing,
    } as Response);

    const { result } = renderHook(() => useListings());

    act(() => {
      result.current.getListingById('1');
    });

    await waitFor(() => {
      expect(result.current.listing).toEqual(mockListing);
      expect(result.current.error).toBeNull();
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/listings/1');
  });

  test('getListingById handles errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const { result } = renderHook(() => useListings());

    act(() => {
      result.current.getListingById('999');
    });

    await waitFor(() => {
      expect(result.current.error).toBe('not_found');
      expect(result.current.listing).toBeNull();
    });
  });
});
