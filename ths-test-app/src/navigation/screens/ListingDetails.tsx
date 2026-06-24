import { LoggedInContext } from "@/App";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ListingDetails({
  route,
}: {
  route: { params: { listingId: string } };
}) {
  const insets = useSafeAreaInsets();
  const { listingId } = route.params;
  const { isLoggedIn } = useContext(LoggedInContext);
  const navigation = useNavigation();
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!listingId || listingId === "undefined") {
      setError("No listing ID provided");
      return;
    }
    setError(null);
    fetch(`/api/listings/${listingId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("NOT_FOUND");
        }
        return response.json();
      })
      .then((data) => {
        setTitle(data?.title);
      })
      .catch((err) => {
        if (err.message === "NOT_FOUND") {
          setError("Listing not found");
        } else {
          setError("Network error. Please try again.");
        }
      });
  }, [listingId]);
  return (
    <View style={[styles.container, { paddingTop: 50 }]}>
      <Text style={styles.title}>Details for listing: {listingId}</Text>
      {error ? (
        <Text style={styles.subtitle}>{error}</Text>
      ) : (
        <Text style={styles.subtitle}>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9c2ff",
    flex: 1,

    alignItems: "center",
  },

  title: {
    fontSize: 32,
    marginLeft: 16,
    marginRight: 16,

    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    padding: 20,
  },
});
