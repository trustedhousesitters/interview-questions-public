/**
 * React Native Tech Test
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import { getPets } from './selectors'
import PetModal from "./components/PetModal";
import { Actions } from "./reducers";

const App = () => {
  const dispatch = useDispatch();
  const petList = useSelector(getPets);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [activePet, setActivePet] = React.useState(null);

  const onModalHide = () => {
    setIsModalVisible(false);
    setActivePet(null);
  };
  const onModalShow = (pet) => {
    setIsModalVisible(true);
    setActivePet(pet);
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View
        style={styles.background}>
        {petList.map(pet => (
          <PetListItem
            onPress={() => onModalShow(pet)}
            pet={pet}
            key={pet.id}
          />
        ))}
        {!petList.length && <Text style={styles.emptyLabel}>Not much to see here!</Text>}
      </View>
      <PetModal
        isVisible={isModalVisible}
        onHide={onModalHide}
        pet={activePet}
        onDelete={() => {
          dispatch({type: Actions.DELETE_PET, payload: activePet});
          onModalHide();
        }}
      />
    </SafeAreaView>
  );
};

export default App;


const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  emptyLabel: {
    margin: 36,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
});
