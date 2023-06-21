import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const loginInput = ({ placeholder, secureTextEntry, isInvalid, onChangeText, value }) => {
  return (
    <LinearGradient
      colors={['#1a62a4', '#4d85b8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: 60, width: windowWidth - 50, borderRadius: 15, margin: 12, marginLeft: 24, marginRight: 24, justifyContent: 'center', alignItems: 'center', opacity: 1 }}>
      <TextInput style={[styles.container, isInvalid && styles.inputInvalid]} placeholder={placeholder} placeholderTextColor='#d5dfeb' secureTextEntry={secureTextEntry} clearButtonMode='always' onChangeText={onChangeText} value={value} />
    </LinearGradient>
  )
}

export default loginInput

const styles = StyleSheet.create({
  container: {
    //backgroundColor:'#6d8fba',
    opacity: 1,
    color: 'white',
    height: 60,
    width: windowWidth - 50,
    borderRadius: 15,
    padding: 20,
    margin: 12,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18
  },

  inputInvalid: {
    height: 60,
    width: windowWidth - 30,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'red',
    opacity: 1,
    padding: 20,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.2,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18
  }


})