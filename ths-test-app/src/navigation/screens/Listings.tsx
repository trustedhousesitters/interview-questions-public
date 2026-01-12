import { useContext, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoggedInContext } from '@/App';
import { useListings } from '@/hooks/useListings';
import LoginRequiredScreen from './LoginRequired';

const ListingRow = ({id, title}: {id: string, title: string}) => {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate('ListingDetails', { id })} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default function ListingsScreen() {
  const { listingData, getAllListings } = useListings();
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    if (isLoggedIn) {
      getAllListings();
    }
  }, [getAllListings, isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginRequiredScreen />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 60 }]}>
      <FlatList
        data={listingData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListingRow id={item.id} title={item.title} />}
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
