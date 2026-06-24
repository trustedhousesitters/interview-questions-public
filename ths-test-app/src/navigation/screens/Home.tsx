import { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoggedInContext } from "@/App";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { isLoggedIn, toggleIsLoggedIn } = useContext(LoggedInContext);
  const handlePress = async () => {
    if (isLoggedIn) {
      toggleIsLoggedIn();
    } else {
      toggleIsLoggedIn();
      AsyncStorage.getItem("pendingListingId").then((listingId) => {
        if (listingId) {
          navigation.dispatch(
            StackActions.push("ListingDetails", { listingId }),
          );
          AsyncStorage.removeItem("pendingListingId");
        } else {
          navigation.navigate("HomeTabs", { screen: "Listings" });
        }
      });
    }
  };
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Button title={isLoggedIn ? "Log Out" : "Log In"} onPress={handlePress} />
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
    fontSize: 32,
  },
});
