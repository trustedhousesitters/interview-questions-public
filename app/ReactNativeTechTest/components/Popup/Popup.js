import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getPets} from '../../selectors';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {DELETE_PET} from '../../reducers';
import {timesDeclination} from '../../helpers/timesDeclination';

export const Popup = ({close, id}) => {
  const currentPet = useSelector(getPets).find(pet => pet.id === id);
  const dispatch = useDispatch();
  return (
    <View style={styles.modalBox}>
      <View style={styles.contentBox}>
        <View style={styles.iconContainer} />
        <Text style={styles.nameText}>{currentPet.name}</Text>
        <Text style={styles.text}>{currentPet.type}</Text>
        <Text style={styles.text}>
          Needs feeding {currentPet.feeds} {timesDeclination(currentPet.feeds)}{' '}
          a day
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={close}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            close();
            dispatch({type: DELETE_PET, payload: {petId: currentPet.id}});
          }}>
          <Text style={styles.buttonText}>Delete</Text>
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
    zIndex: 100001,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    paddingTop: 60,
    width: '70%',
    minHeight: 100,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  nameText: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.dark,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.dark,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItesm: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  iconContainer: {
    height: 80,
    width: 80,
    borderRadius: 45,
    backgroundColor: 'grey',
    marginRight: 16,
    position: 'absolute',
    top: '-17%',
    zIndex: 100001,
  },
};
