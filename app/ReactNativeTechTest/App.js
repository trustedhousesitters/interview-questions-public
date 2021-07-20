/**
 * React Native Tech Test
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import PetDetails from './components/PetDetails/';
import {getPets} from './selectors';
import Modal from './components/Modal/Modal';
import {deletePet} from './reducers';

const App = () => {
  const petList = useSelector(getPets);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  const onPetListItemPress = pet => {
    setSelectedPet(pet);
    setIsModalVisible(true);
  };

  const onDelete = () => {
    dispatch(deletePet(selectedPet.id));
    setIsModalVisible(false);
    setSelectedPet(null);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View style={backgroundStyle}>
        {petList.map(pet => (
          <PetListItem pet={pet} key={pet.id} onPress={onPetListItemPress} />
        ))}
      </View>
      <Modal isModalVisible={isModalVisible}>
        {selectedPet && <PetDetails pet={selectedPet} />}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeModalButton: {
    backgroundColor: 'blue',
  },
  button: {
    padding: 10.0,
    borderRadius: 10.0,
  },
  closeButton: {
    backgroundColor: 'blue',
    marginBottom: 10.0,
  },
  buttonText: {
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default App;
