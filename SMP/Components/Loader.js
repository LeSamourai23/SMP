import { View, Dimensions, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/constants'
import Logo from '../assets/logo.png'
import CustomActivityIndicator from './ActivityIndicator'

const { width, height } = Dimensions.get('window');

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomActivityIndicator/>
    </View>
  )
}

export default Loader