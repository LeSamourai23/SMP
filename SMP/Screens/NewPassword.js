import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, KeyboardAvoidingView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/logo.png'
import { COLORS } from '../Constants/constants'
import { BlurView } from 'expo-blur';
import LoginInput from '../Components/LoginInput';
import LoginButton from '../Components/LoginButton';
import { Icon } from '@rneui/themed';
import styled from 'styled-components/native'

const ChangePassword = ({navigation}) => {

  const goBack = () => {
    navigation.goBack();
  };

  const { width, height } = Dimensions.get('window');

  return (
    <Pressable style={{flex:1, justifyContent:'center', alignContent:'center', width, height}} onPress={Keyboard.dismiss}>
    <LinearGradient
        colors={[COLORS.LOGIN_LG1, COLORS.LOGIN_LG2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex:1, justifyContent:'center', alignContent:'center', width, height}}
      >
      <BlurView style={{flex:1}} intensity={40} tint="dark">
        <View style={{backgroundColor:'transparent', flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start', marginTop:height/15, marginLeft:width/25}}>
          <TouchableOpacity onPress={goBack} style={{}}>
            <Icon name="arrow-back-outline" type="ionicon" color={'#d5dfeb'} size={30}/>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{alignItems:'center', marginBottom:width/10}}>
            <Text style={{fontWeight:500, opacity:1, fontSize:35, color:'#d5dfeb'}}>Create New Password</Text>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', margin:24, marginBottom:width/10}}>
            <Text style={{fontSize:16, textAlign:'center', color:'#c5d5e8'}}>Your new password must be at least 8 characters</Text>
          </View>
          <View style={{alignItems:'center', marginBottom:height/15}}>
            <LoginInput placeholder="New Password" secureTextEntry={true}/>
            <LoginInput placeholder="Confirm Password" secureTextEntry={true}/>
          </View>
          <View style={{alignItems:'center', marginBottom: height/10}}>
            <LoginButton text='Reset Password' onPress={()=> navigation.navigate("Login")}/>
          </View>
        </View>
      </BlurView>
    </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ChangePassword;
