import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {images} from '../../assets';
import {getPets} from '../../selectors';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Popup = ({close, id}) => {
  const currentPet = useSelector(getPets).find(pet => pet.id === id);
  return (
    <View style={styles.modalBox}>
      <View style={styles.contentBox}>
        <View style={styles.closeRow}>
          <TouchableOpacity onPress={close}>
            <Image source={images.close} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Details:</Text>
        <Text style={styles.text}>Pets name: {currentPet.name}</Text>
        <Text style={styles.text}>Pets type: {currentPet.type}</Text>
        <Text style={styles.text}>Feed: {currentPet.feeds}</Text>
      </View>
    </View>
  );
};

const styles = {
  modalBox: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
    zIndex: 100001,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    width: '80%',
    minHeight: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
  },
  closeRow: {
    width: '100%',
    alignItems: 'flex-end',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
  },
};
