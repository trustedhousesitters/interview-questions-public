
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PetListItem = ({pet, openPopup, setId}) => {
  return (
    <View style={styles.petRow}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          openPopup();
          setId(pet?.id);
        }}>
        <View style={styles.iconContainer} />
        <View style={styles.nameAndTypeContainer}>
          <Text style={styles.nameText}>{pet.name}</Text>
          <Text style={{color: Colors.dark}}>{pet.type}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    height: 92,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
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
  deleteIcon: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default PetListItem;
