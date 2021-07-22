import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PetListItem = ({pet, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(pet)}>
      <View style={styles.container}>
        <View style={styles.iconContainer} />
        <View style={styles.nameAndTypeContainer}>
          <Text style={styles.nameText}>{pet.name}</Text>
          <Text style={{color: Colors.dark}}>{pet.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PetListItem.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    feeds: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    height: 92,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    height: 46,
    width: 46,
    borderRadius: 45,
    backgroundColor: 'grey',
    marginRight: 16,
  },
  nameAndTypeContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});

export default PetListItem;
