import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

const { width, height } = Dimensions.get('window');

const sortButtons = ({onPress, title}) => {
  return (
    <Button
        title={title}
        buttonStyle={{
            backgroundColor: '#d5dfeb',
            borderRadius: 10,
        }}
        containerStyle={{
            width: width/3,
            marginHorizontal: 5,
            marginVertical: 10,
        }}
        titleStyle={{ color: 'black', fontSize:'14' }}
    />
  )
}

export default sortButtons

const styles = StyleSheet.create({})