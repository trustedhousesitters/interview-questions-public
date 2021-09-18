import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TouchableHighlight} from 'react-native';

const ModalContainer = ({children, onPressCloseModal}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPressCloseModal}
      underlayColor="transparent">
      <View style={styles.modal} onStartShouldSetResponder={event => true}>
        {children}
      </View>
    </TouchableHighlight>
  );
};

ModalContainer.propTypes = {
  onPressCloseModal: PropTypes.func,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalContainer;
