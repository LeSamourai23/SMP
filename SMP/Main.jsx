import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Redux/action'
import Loader from './Components/Loader'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Screens/Login'
import InAppNav from './Navigator/InAppNav'
import ResetPass from './Screens/ResetPass'
import Verify from './Screens/Verify'

const Stack = createNativeStackNavigator()

const Main = () => {

  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(loadUser())

  }, [dispatch])


  const { isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    loading ? <Loader /> : <NavigationContainer>

        <Stack.Navigator initialRouteName={isAuthenticated ? "App" : "Login"}>
            <Stack.Screen name='App' component={InAppNav} options={{headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Reset Password' component={ResetPass} options={{headerShown: false}}/>
            <Stack.Screen name='Verify' component={Verify} options={{headerShown: false}}/>
        </Stack.Navigator>
      {isAuthenticated}
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({

    mainScreen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
})