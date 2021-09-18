import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Colors} from '../../constants/Colors';
import ImageCircle from '../ImageCircle/ImageCircle';
import Button from '../Button/Button';

const PetDetailsModal = ({pet, onPressCloseModal, onPressDelete}) => {
  if (!pet) {
    return null;
  }
  const {image, name, type, feeds} = pet;

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPressCloseModal}
      underlayColor="transparent">
      <View style={styles.modal}>
        <View style={styles.imageContainer}>
          <ImageCircle image={image} size="large" />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>{type}</Text>
        <Text
          style={styles.detail}>{`Needs feeding ${feeds} times a day`}</Text>
        <View style={styles.buttonContainer}>
          <Button
            label="Close"
            backgroundColor={Colors.blue}
            onPress={onPressCloseModal}
          />
          <Button
            label="Delete"
            backgroundColor={Colors.red}
            onPress={onPressDelete}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

PetDetailsModal.propTypes = {
  pet: PropTypes.object,
  onPressCloseModal: PropTypes.func,
  onPressDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 25,
  },
  imageContainer: {
    marginTop: -40,
    marginBottom: 20,
  },
});

export default PetDetailsModal;
