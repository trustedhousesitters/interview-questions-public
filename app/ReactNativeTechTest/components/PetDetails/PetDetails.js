import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const PetDetails = ({pet}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer} />
      <Text style={styles.petNameText}>{pet.name}</Text>
      <Text style={styles.petTypeText}>{pet.type}</Text>
      <Text>
        Needs feeding{' '}
        {pet.feeds === 1 ? 'once a day.' : `${pet.feeds} times a day.`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 45,
    backgroundColor: 'grey',
    marginTop: -65,
    marginBottom: 30,
  },

  petNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  petTypeText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

PetDetails.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    feeds: PropTypes.number.isRequired,
  }).isRequired,
};

export default PetDetails;
