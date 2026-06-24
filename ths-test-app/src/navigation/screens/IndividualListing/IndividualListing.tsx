import { Text, View, Pressable, Alert, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { styles } from "./styles";
import THSLogoSquare from "../../../assets/images/THSLogoSquare.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getListingAddressFormated } from "../../../helpers/helper";
import { IconSymbol } from "@/components/ui/IconSymbol";
type RootStackParamList = {
  IndividualListing: { id: number };
};

type Props = NativeStackScreenProps<RootStackParamList, "IndividualListing">;

interface ListingInformation {
  id: number;
  title: string;
  animals: {
    count: number;
    slug: string;
  }[];
  location: {
    name: string;
    countryName: string;
  };
}

interface ListingItem {
  id: number;
  title: string;
}

const IndividualListing = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const [listingData, setListingData] = useState<ListingInformation | null>(
    null
  );
  const [allListings, setAllListings] = useState<ListingItem[]>([]);

  useEffect(() => {
    fetch("/api/listings")
      .then((response) => response.json())
      .then((data) => setAllListings(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListingData(data))
      .catch((error) => {
        console.error(error);
        Alert.alert("Error accessing listing, please try again later");
      });
  }, [id]);

  const otherListings = allListings.filter((listing) => listing.id !== id);

  const OtherListingCard = ({
    listing,
    onPress,
  }: {
    listing: ListingItem;
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress} style={styles.otherListingItem}>
      <Image source={THSLogoSquare} style={styles.otherListingImage} />
      <Text style={styles.otherListingText}>{listing.title}</Text>
    </Pressable>
  );

  const formattedAddress = getListingAddressFormated(listingData);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable onPress={() => navigation.goBack()} testID="back-button">
        <IconSymbol size={28} name="chevron.left" color={"#006263"} />
      </Pressable>

      <View style={styles.listingCard}>
        <Text style={styles.title}>{listingData?.title}</Text>
        <Text>{formattedAddress}</Text>
        <Text>
          {listingData?.animals?.[0]?.count} {listingData?.animals?.[0]?.slug}
        </Text>
      </View>

      {otherListings.length > 0 && (
        <View style={styles.otherListingsContainer}>
          <Text style={styles.otherListingsTitle}>
            Other Listings to Explore:
          </Text>
          <FlashList
            data={otherListings.slice(0, 5)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={styles.otherListingsContent}
            renderItem={({ item }) => (
              <OtherListingCard
                listing={item}
                onPress={() => navigation.push("IndividualListing", { id: item.id })}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default IndividualListing;
