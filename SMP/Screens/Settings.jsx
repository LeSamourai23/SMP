import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { logout } from '../Redux/action';
import { useDispatch } from 'react-redux'
import { Header } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants'
import { Button } from '@rneui/base';

const { width, height } = Dimensions.get('window');

const Settings = ({navigation}) => {

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
}
  
  return (
    <View style={styles.mainContainer}>
      <Header
        centerComponent={{ text: 'Settings', style: styles.heading }}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors:[COLORS.SECONDARY_LG1, COLORS.SECONDARY_LG2],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      />
        <Button
          title="Change Password"
          buttonStyle={styles.button}
          onPress={()=> navigation.navigate("Change Password")}
          containerStyle={{
            width: width/1.05,
            alignSelf:'center',
            marginHorizontal: 50,
            marginTop: 15,
            marginBottom:5,
            borderRadius:15,
            shadowOpacity:0.8,
            shadowRadius:6,
            shadowOffset: {
              width: 2,
              height: 6,
            },
            shadowColor:'#D6D8DC'
          }}
          titleStyle={{ color: 'black', justifyContent:'flex-start', fontWeight: 500, fontSize: 18 }}
         />
        <Button
          title="Send Feedback"
          buttonStyle={styles.button}
          onPress={()=> navigation.navigate("Feedback")}
          containerStyle={{
            width: width/1.05,
            alignSelf:'center',
            marginHorizontal: 50,
            marginBottom:5,
            borderRadius:15,
            shadowOpacity:0.8,
            shadowRadius:6,
            shadowOffset: {
              width: 2,
              height: 6,
            },
            shadowColor:'#D6D8DC'
          }}
          titleStyle={{ color: 'black', justifyContent:'flex-start', fontWeight: 500, fontSize: 18 }}
         />

        <Button
          title="Report a Bug"
          buttonStyle={styles.button}
          onPress={()=> navigation.navigate("Report")}
          containerStyle={{
            width: width/1.05,
            alignSelf:'center',
            marginHorizontal: 50,
            marginBottom:5,
            borderRadius:15,
            shadowOpacity:0.8,
            shadowRadius:6,
            shadowOffset: {
              width: 2,
              height: 6,
            },
            shadowColor:'#D6D8DC'
          }}
          titleStyle={{ color: 'black', justifyContent:'flex-start', fontWeight: 500, fontSize: 18 }}
         />
        <Button
          title="Log Out"
          buttonStyle={styles.button}
          containerStyle={{
            width: width/1.05,
            alignSelf:'center',
            marginHorizontal: 50,
            marginBottom:5,
            borderRadius:15,
            shadowOpacity:0.8,
            shadowRadius:6,
            shadowOffset: {
              width: 2,
              height: 6,
            },
            shadowColor:'#D6D8DC'
          }}
          onPress={logoutHandler}
          titleStyle={{ color: 'black', justifyContent:'flex-start', fontWeight: 500, fontSize: 18 }}
        />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    justifyContent:'flex-start',
    backgroundColor:COLORS.PRIMARY_BG
  },

  heading: {
    color: '#151617',
    fontSize: 22,
    fontWeight: 600
  },

  button:{
    backgroundColor:'white',
    height:60, 
    margin:2, 
    borderRadius:15
  }
})