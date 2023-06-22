import React, { useEffect, useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Redux/action';
import { COLORS } from '../Constants/constants'
import { BlurView } from 'expo-blur';
import LoginInput from '../Components/LoginInput';
import PasswordInput from '../Components/PasswordInput'
import LoginButton from '../Components/LoginButton';

const Login = ({navigation}) => {

  const { width, height } = Dimensions.get('window');

  const { error } = useSelector(state => state.auth)

  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
      dispatch(login(email, password))
  }

  useEffect(() => {
      if (error) {
          alert(error)
          dispatch({ type: "clearError" })
      }

  }, [error, dispatch, alert,])

  return (
    <Pressable style={{flex:1, justifyContent:'center', alignContent:'center', width, height}} onPress={Keyboard.dismiss}>
    <LinearGradient
        colors={[COLORS.LOGIN_LG1, COLORS.LOGIN_LG2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex:1, justifyContent:'center', alignContent:'center', width, height}}
      >
      <BlurView style={{flex:1}} intensity={40} tint="dark">
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <View style={{alignItems:'center', justifyContent:'center', marginBottom:30}}>
            <Image source={Logo} style={{width: width/1.65, height: height/4.95, marginTop:20}}/>
          </View>
          <View style={{marginBottom:height/12, alignItems:'center'}}>
            <Text style={{fontWeight:500, opacity:1, fontSize:35, color:'#d5dfeb'}}>Agriculture</Text>
          </View>
          <View style={{alignItems:'center', marginBottom:height/7.5}}>
            <LoginInput placeholder="ID" secureTextEntry={false} value={email} onChangeText={setEmail}/>
            <PasswordInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}/>
          </View>
          <View style={{alignItems:'center', marginBottom: height/10}}>
            <LoginButton text='Sign In' onPress={loginHandler} value={email} onChangeText={setEmail}/>
          </View>
          <View style={{marginBottom:height/18, alignItems:'center'}}>
            <Text style={{fontWeight:500, fontSize:15, color: 'black', opacity: 0.7}}>Don't remember your password?</Text>
            <TouchableOpacity  onPress={() => navigation.navigate("Reset Password")}>
              <Text style={{fontWeight:600, color:'white', fontSize: 17}}>Generate New Password</Text>
            </TouchableOpacity>
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

export default Login;
