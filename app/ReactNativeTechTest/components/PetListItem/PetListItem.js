import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImageCircle from '../ImageCircle/ImageCircle';

const PetListItem = ({pet, onPressPet}) => {
  const {name, type, image} = pet;
  const onPressItem = () => onPressPet(pet);
  return (
    <TouchableHighlight style={styles.container} onPress={onPressItem} underlayColor={Colors.light}>
      <>
        <View style={styles.imageContainer}>
          <ImageCircle image={image} />
        </View>
        <View style={styles.nameAndTypeContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={{color: Colors.dark}}>{type}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    height: 92,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
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
