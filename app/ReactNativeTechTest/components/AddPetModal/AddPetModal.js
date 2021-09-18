import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import Button from '../Button/Button';

const fetchUri = 'https://random.dog/woof?include=jpg';

const fetchRandomDogImage = async () => {
  return fetch(fetchUri)
    .then(response => response.text())
    .then(text => `https://random.dog/${text}`);
};

const AddPetModal = ({onPressCloseModal, addPet}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const onPressSubmit = async () => {
    if (name) {
      fetchRandomDogImage()
        .then(image => {
          addPet({
            name,
            type,
            image,
          });
        })
        .catch(() => {
          // tell user something went wrong
        });
    } else {
      // display invalid field styles for 'name'
    }
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPressCloseModal}
      underlayColor="transparent">
      <SafeAreaView style={styles.modal}>
        <View style={styles.form}>
          <TouchableOpacity
            onPress={onPressCloseModal}
            style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add your pet details</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Type of pet (e.g. cat, dog)"
            style={styles.input}
            onChangeText={setType}
            value={type}
          />
          <View style={styles.buttonContainer}>
            <Button
              label="Add pet"
              onPress={onPressSubmit}
              backgroundColor={Colors.primary}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableHighlight>
  );
};

AddPetModal.propTypes = {
  pet: PropTypes.object,
  onPressCloseModal: PropTypes.func,
  onPressDelete: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  form: {
    paddingHorizontal: 15,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  closeButton: {
    paddingHorizontal: 15,
    height: 30,
    marginLeft: 'auto',
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.light,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
});

export default AddPetModal;
