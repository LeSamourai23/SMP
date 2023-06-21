import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/logo.png'
import { COLORS } from '../Constants/constants'
import { BlurView } from 'expo-blur';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../Components/LoginInput';
import LoginButton from '../Components/LoginButton';
import { Icon } from '@rneui/themed';
import { forgetPassword } from '../Redux/action';

const ResetPass = ({ navigation }) => {

  const [email, setEmail] = useState("");

  const { loading } = useSelector(state => state.message)

  const dispatch = useDispatch()

  const forgetHandler = async () => {

    dispatch(forgetPassword(email))
    navigation.navigate("Verify")
  }

  const goBack = () => {
    navigation.goBack();
  };

  const { width, height } = Dimensions.get('window');

  return (

    <Pressable style={{ flex: 1, justifyContent: 'center', alignContent: 'center', width, height }} onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={[COLORS.LOGIN_LG1, COLORS.LOGIN_LG2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center', width, height }}
      >
        <BlurView style={{ flex: 1 }} intensity={40} tint="dark">
          <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: height / 15, marginLeft: width / 25 }}>
            <TouchableOpacity onPress={goBack} style={{}}>
              <Icon name="arrow-back-outline" type="ionicon" color={'#d5dfeb'} size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 500, opacity: 1, fontSize: 35, color: '#d5dfeb' }}>Reset Password</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 24, marginBottom: width / 5 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', color: '#c5d5e8' }}>Enter the email associated with your account and we'll send an email with instructions to reset your password</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: height / 25 }}>
              <LoginInput placeholder="Email" secureTextEntry={false} onChangeText={setEmail} value={email} />
            </View>
            <View style={{ alignItems: 'center', marginBottom: height / 10 }}>
              <LoginButton text='Send Email' onPress={forgetHandler} />
            </View>
          </View>
        </BlurView>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ResetPass;
