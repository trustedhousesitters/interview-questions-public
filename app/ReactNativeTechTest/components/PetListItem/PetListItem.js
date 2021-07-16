import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PetListItem = ({pet, openPopup}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={openPopup}>
      <View style={styles.iconContainer} />
      <View style={styles.nameAndTypeContainer}>
        <Text style={styles.nameText}>{pet.name}</Text>
        <Text style={{color: Colors.dark}}>{pet.type}</Text>
      </View>
    </TouchableOpacity>
  );
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
