/**
 * React Native Tech Test
 */

import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import {getPets} from './selectors';
import PetDetailsModal from './components/PetDetailsModal/PetDetailsModal';
import {addPet, deletePet} from './actions';

import {Colors} from './constants/Colors';
import AddPetModal from './components/AddPetModal/AddPetModal';
import Button from './components/Button/Button';

const App = () => {
  const petList = useSelector(getPets);
  const dispatch = useDispatch();

  const [selectedPet, setSelectedPet] = useState();
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  console.log('petList', petList);

  const onPressDeletePet = petId => {
    setSelectedPet(undefined);
    dispatch(deletePet(petId));
  };

  const onAddPet = petDetails => {
    setShowAddPetModal(false);
    dispatch(addPet(petDetails));
  };

  // TODO: add flatlist for displaying pets

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View style={backgroundStyle}>
        {petList.map(pet => (
          <PetListItem pet={pet} key={pet.id} onPressPet={setSelectedPet} />
        ))}
      </View>

      <View style={{marginHorizontal: 15}}>
        <Button
          label="Add pet"
          backgroundColor={Colors.primary}
          onPress={() => setShowAddPetModal(true)}
        />
      </View>

      <Modal visible={!!selectedPet} animationType="slide" transparent>
        <PetDetailsModal
          pet={selectedPet}
          onPressCloseModal={() => setSelectedPet(undefined)}
          onPressDelete={onPressDeletePet}
        />
      </Modal>
      <Modal visible={showAddPetModal} animationType="slide" transparent>
        <AddPetModal
          onPressCloseModal={() => setShowAddPetModal(false)}
          addPet={onAddPet}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default App;
