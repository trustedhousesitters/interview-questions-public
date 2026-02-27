import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';

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
                    <Text>{listing?.title}</Text>
                    <Text>Published: {listing?.published &&
                        new Date(listing.published).toLocaleString()}
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text>Owner: </Text>
                <View style={styles.cardDetail}>
                    <Text>Name: {listing?.user.firstName}</Text>
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

                <MapView
                style={styles.map}
                region={{
                    latitude: listing?.location.coordinates.lat,
                    longitude: listing?.location.coordinates.lon,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                >
                <Marker coordinate={{
                    latitude: listing?.location.coordinates.lat,
                    longitude: listing?.location.coordinates.lon,
                }} />
                </MapView>
            </View>

            {listing?.animals?.some(animal => animal.count > 0) && (
                <View style={styles.card}>
                    <Text>Animal(s):</Text>

                    <View style={styles.cardDetail}>
                    {listing.animals
                        .filter(animal => animal.count > 0)
                        .map(animal => (
                        <Text key={animal.slug}>
                            {animal.name?.charAt(0).toUpperCase() + animal.name?.slice(1)} ({animal.count})
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
    card: {
        borderWidth: 3,
        borderColor: '#f9c2ff',
        padding: 20,
        margin: 5,
    },
    cardDetail: {
        left: 10,
    },
    map: {
        height: 200, 
        width: '100%',
        marginTop: 20
    }
});
  