import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type ListingRouteParams = {
  Listing: {
    listingId: number;
  };
};

export default function Listing() {
  const route = useRoute<RouteProp<ListingRouteParams, "Listing">>();
  const { listingId } = route.params;

  return (
    <View>
      <Text>ID: {listingId}</Text>
    </View>
  );
}