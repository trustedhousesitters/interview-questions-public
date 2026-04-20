import { LoggedInContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
interface Listing {
  id: number;
  title: string;
}

const ListingRow = ({
  title,
  listingId,
}: {
  title: string;
  listingId: string;
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.dispatch(StackActions.push("ListingDetails", { listingId }))
      }
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default function ListingsScreen() {
  const navigation = useNavigation();
  const [listingData, setListingData] = useState<Listing[]>([]);
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useContext(LoggedInContext);
  useEffect(() => {
    fetch("/api/listings")
      .then((response) => response.json())
      .then((data) => setListingData(data));
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {isLoggedIn ? (
        <FlatList
          data={listingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListingRow listingId={item.id.toString()} title={item.title} />
          )}
          style={styles.list}
        />
      ) : (
        <Text style={styles.title}>Please log in to see the listings.</Text>
      )}
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
    width: "100%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});
