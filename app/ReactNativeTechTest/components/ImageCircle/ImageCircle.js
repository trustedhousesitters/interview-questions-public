import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View} from 'react-native';
import {Colors} from '../../constants/Colors';

const ImageCircle = ({imageUri, size}) => {
  return (
    <View style={[styles.container, styles[size]]}>
      {imageUri && (
        <Image
          style={styles[size]}
          source={{
            uri: imageUri,
          }}
        />
      )}
    </View>
  );
};

ImageCircle.defaultProps = {
  size: 'small',
  imageUri: 'https://reactnative.dev/img/tiny_logo.png',
};

ImageCircle.propTypes = {
  imageUri: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
  },
  small: {
    height: 46,
    width: 46,
    borderRadius: 46,
  },
  large: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
});

export default ImageCircle;
