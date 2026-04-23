import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import type { Listing } from '@/types/listing';
import { listingsApi } from '@/services/listings';
import type { RootNavigation } from '@/navigation/types';

const ListingRow = ({ listing, onPress }: { listing: Listing; onPress: () => void }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} accessibilityRole="button">
    <Text style={styles.title}>{listing.title}</Text>
    <Text style={styles.location}>{listing.location.name}, {listing.location.countryName}</Text>
  </TouchableOpacity>
);

export default function ListingsScreen() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigation>();

  useEffect(() => {
    const loadListings = async () => {
      const result = await listingsApi.getAll();
      if (result.ok) setListingData(result.data);
    };
    loadListings();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListingRow
            listing={item}
            onPress={() => navigation.navigate('Listing', { listingId: item.id })}
          />
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
