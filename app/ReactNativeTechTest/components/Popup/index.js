import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {images} from '../../assets';

export const Popup = ({close}) => {
  return (
    <View style={styles.modalBox}>
      <View style={styles.contentBox}>
        <TouchableOpacity onPress={close}>
          <Image source={images.close} style={styles.closeIcon} />
          <Text>Modal</Text>
        </TouchableOpacity>
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
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
};
