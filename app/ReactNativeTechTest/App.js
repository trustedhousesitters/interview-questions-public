/**
 * React Native Tech Test
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Header from './components/Header/';
import PetListItem from './components/PetListItem/';
import { getPets } from './selectors'

const App = () => {
  const petList = useSelector(getPets);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <Header />
      <View
        style={backgroundStyle}>
        {petList.map(pet => <PetListItem pet={pet}  key={pet.id}/>)}
      </View>
    </SafeAreaView>
  );
};

export default App;
