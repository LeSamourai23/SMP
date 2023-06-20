import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const PrimaryInput = ({placeholder, secureTextEntry, isInvalid, onChangeText, value}) => {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.container, isInvalid && styles.inputInvalid]} placeholder={placeholder}  placeholderTextColor='#bcc4cb' secureTextEntry={secureTextEntry} clearButtonMode='always' onChangeText={onChangeText} value={value}/>
    </View>
  )
}

export default PrimaryInput

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#6d8fba',
        opacity:1,
        color:'white',
        height:60,
        width:windowWidth-50,
        borderRadius: 15,
        padding:20,
        margin:12,
        marginLeft:24,
        marginRight:24,
        justifyContent:'center',
        alignItems:'center',
        fontSize:18
      },

    inputInvalid:{
      height:60,
      width:windowWidth-30,
      borderRadius: 15,
      backgroundColor: 'white',
      borderWidth:5,
      borderColor:'red',
      opacity:1,
      padding:20,
      margin:12,
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 6 },
      shadowOpacity: 0.2,
      color:'black',
      justifyContent:'center',
      alignItems:'center',
      fontSize:18
    }


})