import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, {useState, useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const LoginButton = ({onPress, text}) => {

  const [isDown, setDown] = useState(false);

  const handlePressIn = useCallback(()=> {
    setDown(true);
  })
  const handlePressOut = useCallback(()=> {
    setDown(false);
  })

  const gradColors= isDown? ['#F0B517', '#FFF17C'] : ['#FFF17C', '#F0B517'] 


  return (
    <TouchableWithoutFeedback style={styles.button} onPress={onPress} underlayColor='#E1B100' onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={styles.buttonShadow}>
        <LinearGradient
              colors={gradColors} 
              style={styles.linearGradient}
              start={{y: -1, x: 0}}
              end={{y: 2, x: 0}}>

            <Text style={styles.loginText}>{text}</Text>

        </LinearGradient>
        </View>
    </TouchableWithoutFeedback>

  )
}

export default LoginButton

const styles = StyleSheet.create({
    button:{
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth-30,
      height: 100,
      },
    
      loginText:{
        color: "#01519a",
        opacity:0.8,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft : 10,
        paddingRight : 10
      },

      linearGradient:{
        width: windowWidth-50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        
      },

      buttonShadow:{
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius:4
      }

})