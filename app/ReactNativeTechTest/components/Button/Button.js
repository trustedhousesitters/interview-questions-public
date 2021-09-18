import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Colors} from '../../constants/Colors';

const Button = ({label, onPress, backgroundColor}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.oneOf(Object.values(Colors)),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 45,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  text: {
    color: Colors.white,
  },
});

export default Button;
