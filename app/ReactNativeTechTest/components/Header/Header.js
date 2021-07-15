import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import constants from '../../constants';
import { images } from '../../assets';

const Header = () => {
  const logoWidth = Dimensions.get('window').width - 24;

  return (
    <View
      style={styles.headingContainer}
    >
      <Image
        style={{
          width: logoWidth,
          height: logoWidth / constants.LOGO_ASPECT_RATIO,
        }}
        source={images.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    paddingVertical: 12,
    marginHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Header;
