import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type ListingRouteParams = {
  Listing: {
    listingId: number;
  };
};

interface Coordinates {
    lat: number;
    lon: number;
  }
  
  interface Location {
    name: string;
    slug: string;
    admin1Name: string;
    admin1Slug: string;
    admin2Name: string;
    admin2Slug: string;
    countryName: string;
    countrySlug: string;
    continentName: string;
    continentSlug: string;
    coordinates: Coordinates;
  }
  
  interface Animal {
    name: string;
    slug: string;
    count: number;
  }
  
  interface User {
    id: string;
    firstName: string;
    profilePhoto: {
      id: string;
      publicId: string;
    };
    isReferred: boolean;
    referredCount: number;
  }
  
  interface Listing {
    id: string;
    title: string;
    published: string;
    location: Location;
    user: User;
    animals: Animal[];
  }

  export default function Listing() {
    const route = useRoute<RouteProp<ListingRouteParams, "Listing">>();
    const { listingId } = route.params;
  
    const [listing, setListing] = useState<Listing>();
  
    useEffect(() => {
      fetch(`/api/listings/${listingId}`)
        .then(response => response.json())
        .then(data => setListing(data));
    }, [listingId]);
  
    return (
        <ScrollView>
            <View style={styles.container}>

            <View style={styles.card}>
                <View style={styles.cardDetail}>
                    <Text>Description: {listing?.title}</Text>
                    <Text>Published: {listing?.published &&
                        new Date(listing.published).toLocaleString()}
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text>Owner: </Text>
                <View style={styles.cardDetail}>
                    <Text>Username: {listing?.user.firstName}</Text>
                    <Text>Referrals: {listing?.user.referredCount}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text>Location: </Text>
                <Text style={styles.cardDetail}>
                    {listing?.location.name},{" "}
                    {listing?.location.admin2Name},{" "}
                    {listing?.location.countryName}
                </Text>
            </View>

            {listing?.animals?.some(animal => animal.count > 0) && (
                <View style={styles.card}>
                    <Text>Animals:</Text>

                    <View style={styles.cardDetail}>
                        {listing.animals
                            .filter(animal => animal.count > 0)
                            .map(animal => (
                                <Text key={animal.slug}>
                                    {animal.name} ({animal.count})
                                </Text>
                            ))}
                    </View>
                </View>
            )}
            </View>
        </ScrollView>
    );
  }

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16,
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
    card: {
        borderWidth: 1,
        padding: 20,
        margin: 5,
    },
    cardDetail: {
        left: 10,
    },
});
  