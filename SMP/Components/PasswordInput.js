import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { Icon, Button } from '@rneui/themed';

const windowWidth = Dimensions.get('window').width;

const PasswordInput = ({placeholder, secureTextEntry, isInvalid, onChangeText, value}) => {

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <LinearGradient
        colors={['#1a62a4', '#4d85b8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{height:60, width:windowWidth-50, borderRadius: 15, margin:12, marginLeft:24, marginRight:24, justifyContent:'center', alignItems:'center', opacity:1, flexDirection: 'row', flexWrap: 'nowrap'}}>
        <TextInput style={styles.container} placeholder={placeholder}  placeholderTextColor='#d5dfeb' secureTextEntry={isPasswordSecure} onChangeText={onChangeText} value={value}/>
        
{/*         <Button 
            icon={{ name: 'eye', type: 'ionicon', size: 15, color: 'white'}} 
            buttonStyle={{borderRadius: 20, color:'white'}} 
            containerStyle={{ width: 20, marginRight: 30, height:20 }}
            onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            /> */}
        <TouchableOpacity style={{width: 20, marginRight: 30, height:20}} onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}>
            <Icon name={isPasswordSecure ? "eye-off" : "eye"} type='ionicon' size= {20} color='white'/>
        </TouchableOpacity>

        
{/*             <Icon name='eye' type="ionicon" color='black' style={{position: 'absolute' }} size={20}/> */}
    </LinearGradient>
  )
}

export default PasswordInput

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'#6d8fba',
        opacity:1,
        color:'white',
        height:60,
        width:windowWidth-50,
        borderRadius: 15,
        padding:20,
        margin:12,
        marginLeft:24,
        marginRight:-30,
        justifyContent:'center',
        alignItems:'center',
        fontSize:18
      },

})