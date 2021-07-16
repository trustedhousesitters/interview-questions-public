/**
 * React Native Tech Test
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import {getPets} from './selectors';
import {Popup} from './components/Popup';

const App = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [currentPetId, setCurrentPetId] = useState();
  const petList = useSelector(getPets);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };
  const close = () => {
    setModalVisibility(false);
  };
  const open = () => {
    setModalVisibility(true);
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      {isModalVisible && <Popup close={close} id={currentPetId} />}
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View style={backgroundStyle}>
        {petList.map(pet => (
          <PetListItem
            pet={pet}
            key={pet.id}
            openPopup={open}
            setId={setCurrentPetId}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
