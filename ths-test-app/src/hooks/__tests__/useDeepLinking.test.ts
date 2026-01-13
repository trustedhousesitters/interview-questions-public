import { renderHook, waitFor } from '@testing-library/react-native';
import { useDeepLinking } from '../useDeepLinking';
import * as Linking from 'expo-linking';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';
import type { ParsedURL } from 'expo-linking';

jest.mock('expo-linking');

const mockLinking = Linking as jest.Mocked<typeof Linking>;
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

type NavigationRef = NavigationContainerRef<ReactNavigation.RootParamList>;

const createMockParsedURL = (hostname: string, queryParams: Record<string, string> = {}): ParsedURL => ({
  scheme: 'myapp',
  hostname,
  path: '',
  queryParams,
});

describe('useDeepLinking', () => {
  let mockNavigationRef: NavigationRef;

  beforeEach(() => {
    jest.clearAllMocks();

    mockNavigationRef = {
      isReady: jest.fn(() => true),
      navigate: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(() => ({
        key: 'root',
        index: 0,
        routeNames: ['Home'],
        routes: [{ name: 'Home', key: 'home', params: undefined }],
        type: 'stack' as const,
        stale: false as const,
      })),
    } as unknown as NavigationRef;

    mockLinking.getInitialURL = jest.fn().mockResolvedValue(null);
    mockLinking.addEventListener.mockImplementation(() => ({
      remove: jest.fn(),
    }) as unknown as ReturnType<typeof Linking.addEventListener>);
  });

  test('ignores URLs with wrong hostname', async () => {
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://wrong/123');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('wrong', { listingId: '123' }));

    renderHook(() => useDeepLinking(mockNavigationRef, true));

    await waitFor(() => expect(mockLinking.getInitialURL).toHaveBeenCalled());
    expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
  });

  test('ignores URLs without listingId', async () => {
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://listing');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('listing'));

    renderHook(() => useDeepLinking(mockNavigationRef, true));

    await waitFor(() => expect(mockLinking.getInitialURL).toHaveBeenCalled());
    expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
  });

  test('navigates to LoginRequired when user is not logged in', async () => {
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://listing?listingId=123');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('listing', { listingId: '123' }));

    renderHook(() => useDeepLinking(mockNavigationRef, false));

    await waitFor(() => {
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('LoginRequired');
    });
  });

  test('navigates to NotFound when listing does not exist', async () => {
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://listing?listingId=999');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('listing', { listingId: '999' }));
    mockFetch.mockResolvedValueOnce({ status: 404 } as Response);

    renderHook(() => useDeepLinking(mockNavigationRef, true));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/listings/999'));
    await waitFor(() => expect(mockNavigationRef.navigate).toHaveBeenCalledWith('NotFound'));
  });

  test('navigates to ListingDetails when listing exists', async () => {
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://listing?listingId=123');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('listing', { listingId: '123' }));
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    renderHook(() => useDeepLinking(mockNavigationRef, true));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/listings/123'));
    await waitFor(() => expect(mockNavigationRef.navigate).toHaveBeenCalledWith('ListingDetails', { listingId: '123' }));
  });

  test('pushes to ListingDetails when already on ListingDetails screen', async () => {
    mockNavigationRef.getState = jest.fn(() => ({
      key: 'root',
      index: 0,
      routeNames: ['ListingDetails'],
      routes: [{ name: 'ListingDetails', key: 'listingdetails', params: undefined }],
      type: 'stack' as const,
      stale: false as const,
    }));
    mockLinking.getInitialURL = jest.fn().mockResolvedValue('myapp://listing?listingId=123');
    mockLinking.parse.mockImplementation(() => createMockParsedURL('listing', { listingId: '123' }));
    mockFetch.mockResolvedValueOnce({ status: 200 } as Response);

    renderHook(() => useDeepLinking(mockNavigationRef, true));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith('/api/listings/123'));
    await waitFor(() => {
      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        StackActions.push('ListingDetails', { listingId: '123' })
      );
    });
    expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
  });
});
