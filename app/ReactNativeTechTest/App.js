/**
 * React Native Tech Test
 */

import React, {useState} from 'react';
import {SafeAreaView, View, StatusBar, Modal} from 'react-native';
import {useSelector} from 'react-redux';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import {getPets} from './selectors';
import PetDetailsModal from './components/PetDetailsModal/PetDetailsModal';

import {Colors} from './constants/Colors';

const App = () => {
  const petList = useSelector(getPets);

  console.log('petList', petList)

  const [selectedPet, setSelectedPet] = useState();

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  const onPressCloseModal = () => setSelectedPet(undefined);
  const onPressDeletePet = () => {};

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View style={backgroundStyle}>
        {petList.map(pet => (
          <PetListItem pet={pet} key={pet.id} onPressPet={setSelectedPet} />
        ))}
      </View>

      <Modal visible={!!selectedPet} animationType="slide" transparent>
        <PetDetailsModal
          pet={selectedPet}
          onPressCloseModal={onPressCloseModal}
          onPressDelete={onPressDeletePet}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default App;
