/* import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../Redux/action';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch()

    const changePasswordHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword))
    }


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />

                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <Button
                style={Styles.btn}
                onPress={changePasswordHandler}
                color="#fff"
            >
                Change
            </Button>



        </View>
    )
}

export default ChangePassword;


const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
}) */

import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Header, Input, Button } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants';

const ChangePassword = ({navigation}) => {

  const { width, height } = Dimensions.get('window');

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{backgroundColor:COLORS.PRIMARY_BG}}>
      <Header
        leftComponent={
          <View>
            <TouchableOpacity onPress={goBack} style={{}}>
              <Icon name="arrow-back-outline" type="ionicon" color={'black'} size={30}/>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'Change Password', style: styles.header }}
        backgroundColor="transparent"
      />
      <View style={{marginTop:20}}>
        <Input placeholder='Old Password' />
        <Input placeholder='New Password' />
        <Input placeholder='Confirm New Password' />
      </View>
      <Button
        buttonStyle={{ backgroundColor: 'black', borderRadius: 5, width: width/1.05, alignSelf:"center", height:50}}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: [COLORS.SECONDARY_LG1, COLORS.SECONDARY_LG2],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        titleStyle={{color:'black'}}
      >
        Change Password
        </Button>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  header:{
    color: '#151617',
    fontSize: 25,
    fontWeight: 600
  },
})