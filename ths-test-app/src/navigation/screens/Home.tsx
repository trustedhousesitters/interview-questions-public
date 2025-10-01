import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const PetRow = ({name}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default function HomeScreen() {
  const [ serverStarted, setServerStarted ] = useState(false);
  const [ animalData, setAnimalData ] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
      async function enableMocking() {
        if (!__DEV__) {
          return
        }
        await import('../../../msw.polyfills')
        const { server } = await import('../../mocks/server')
        server.listen()
        setServerStarted(true);
      }

      enableMocking();
  }, []);

  useEffect(() => {
    if(serverStarted) {
      fetch("/api/pets").then(response => response.json()).then(data => setAnimalData(data));
    }
  }, [serverStarted]);
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={animalData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <PetRow name={item.name} />}
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
    fontSize: 32,
  },
});
