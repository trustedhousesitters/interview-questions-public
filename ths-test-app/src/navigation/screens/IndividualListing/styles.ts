import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#003939",
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: "white",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: "#003939",
  },
  otherListingsContainer: {
    marginTop: 20,
    height: 100,
  },
  otherListingItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
    marginRight: 10,
    backgroundColor: "white",
  },
  otherListingText: {
    fontSize: 14,
  },
  otherListingsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#003939",
  },
  otherListingsContent: {
    paddingRight: 20,
  },
  otherListingImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
