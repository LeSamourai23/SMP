import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import ActivityIndicator from '../assets/acitivityindicator.png'

const CustomActivityIndicator = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    spin();
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={ActivityIndicator}
        style={[styles.image, { transform: [{ rotate: spinAnimation }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default CustomActivityIndicator;
