import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, KeyboardAvoidingView, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/logo.png'
import { COLORS } from '../Constants/constants'
import { BlurView } from 'expo-blur';
import LoginInput from '../Components/LoginInput';
import LoginButton from '../Components/LoginButton';
import { Icon } from '@rneui/themed';
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Redux/action';

const Verify = ({navigation}) => {

    const { message, error } = useSelector(state => state.message)

    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();


    const dispatch = useDispatch()


    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            alert(error);
            dispatch({ type: "clearError" })
        }
    }, [alert, message, dispatch, error])

    const resetPassHandler = async () => {
      dispatch(resetPassword(otp, newPassword))
      navigation.navigate("Login")
    }

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
          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:500, opacity:1, fontSize:35, color:'#d5dfeb'}}>Enter OTP</Text>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', margin:24, marginBottom:width/5}}>
            <Text style={{fontSize:16, textAlign:'center', color:'#c5d5e8'}}>Enter the 6 digits One Time Password (OTP) that you recieved on your email</Text>
          </View>
          <View style={{alignItems:'center', marginBottom:height/25}}>
            <LoginInput placeholder="OTP" secureTextEntry={false} value={otp} onChangeText={setOtp}/>
            <LoginInput placeholder="New Password" secureTextEntry={true} value={newPassword} onChangeText={setNewPassword}/>
          </View>
          <View style={{alignItems:'center', marginBottom: height/10}}>
            <LoginButton text='Verify' onPress={resetPassHandler}/>
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

export default Verify;
