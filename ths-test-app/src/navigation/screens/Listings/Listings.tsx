import { useEffect, useState } from "react";
import { Text, View, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

interface Listing {
  id: number;
  title: string;
}

const ListingRow = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} style={[styles.item, styles.shadowProp]}>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);

export default function ListingsScreen() {
  const [listingData, setListingData] = useState<Listing[]>([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    fetch("/api/listings")
      .then((response) => response.json())
      .then((data) => setListingData(data))
      .catch((error) => {
        console.error(error);
        Alert.alert("Error accessing listings, please try again later");
      });
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlashList
        data={listingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListingRow
            title={item.title}
            onPress={() => {
              try {
                navigation.navigate("IndividualListing", { id: item.id });
              } catch (error) {
                console.error("Navigation error:", error);
                Alert.alert("Error accessing listings, please try again later");
              }
            }}
          />
        )}
        style={styles.list}
      />
    </View>
  );
}
