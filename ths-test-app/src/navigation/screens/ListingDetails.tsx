import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { LoggedInContext } from '@/App';
import { getAnimalDisplay } from '@/helpers/getAnimalDisplay';
import { useListings } from '@/hooks/useListings';

export default function ListingDetailsScreen() {
  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'ListingDetails'>>();
  const { isLoggedIn } = useContext(LoggedInContext);

  const id = route.params?.listingId ?? route.params?.id;
  const { getListingById, listing } = useListings();

  useEffect(() => {
    if (isLoggedIn && id) {
      getListingById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.title}>Login Required</Text>
        <Text style={styles.subtitle}>Please log in to view this listing.</Text>
      </View>
    );
  }

  if (!listing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }

  const animals = listing.animals || [];
  const { totalCount, icons } = getAnimalDisplay(animals);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          {listing.user?.firstName}
        </Text>
      </View>

      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.subtitle}>
        {listing.location?.name}, {listing.location?.countryName}
      </Text>
      {animals.length > 0 && (
        <Text style={styles.subtitle}>
          {totalCount} {icons}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'flex-end',
    paddingBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#153839',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
});
