import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Listing {
  id: number;
  title: string;
}

const ListingRow = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function ListingsScreen() {
  const [ listingData, setListingData ] = useState<Listing[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  useEffect(() => {
      fetch("/api/listings").then(response => response.json()).then(data => setListingData(data));
  }, []);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Listing", { listingId: item.id })
              }
            >
            <ListingRow title={item.title} />
          </Pressable>
        )}
        style={styles.list}
      />
    </View>
  );
}

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
});
