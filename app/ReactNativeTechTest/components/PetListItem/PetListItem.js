import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PetListItem = ({ pet }) => {
  return(
    <View style={styles.container}>
      <View style={styles.iconContainer} />
      <View style={styles.nameAndTypeContainer}>
        <Text style={styles.nameText}>{pet.name}</Text>
        <Text style={{ color: Colors.dark }}>{pet.type}</Text>
      </View>
    </View>
  );
}

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
