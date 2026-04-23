import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Listing, ListingAnimal } from '@/types/listing';
import type { ApiResult } from '@/services/api';
import { listingsApi } from '@/services/listings';
import type { ListingScreenRouteProps } from '@/navigation/types';

export default function ListingScreen() {
  const route = useRoute<ListingScreenRouteProps>();
  const { listingId } = route.params;
  const insets = useSafeAreaInsets();

  const [result, setResult] = useState<ApiResult<Listing> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadListing = async () => {
      const apiResult = await listingsApi.getById(listingId);
      if (cancelled) return;
      setResult(apiResult);
    };

    loadListing();

    return () => {
      cancelled = true;
    };
  }, [listingId]);

  const containerStyle = [styles.container, { paddingTop: insets.top }];

  if (result === null) {
    return (
      <View style={containerStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!result.ok) {
    const message =
      result.status === 'not_found'
        ? 'Listing not found.'
        : 'Something went wrong. Please check your connection and try again.';
    return (
      <View style={containerStyle}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    );
  }

  const { data } = result;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.location}>
        {data.location.name}, {data.location.admin1Name}, {data.location.countryName}
      </Text>
      {data.animals.length > 0 && (
        <Text style={styles.animals}>
          {data.animals.map((a: ListingAnimal) => `${a.count}x ${a.name}`).join(', ')}
        </Text>
      )}
      <Text style={styles.host}>Hosted by {data.user.firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  animals: {
    fontSize: 16,
    marginBottom: 8,
  },
  host: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#c00',
    padding: 24,
  },
});
