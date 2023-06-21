import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { Header, Input, Button } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants';

const Report = ({navigation}) => {

  const { width, height } = Dimensions.get('window');

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Header
        leftComponent={
          <View>
            <TouchableOpacity onPress={goBack} style={{}}>
              <Icon name="arrow-back-outline" type="ionicon" color={'black'} size={30}/>
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'Report', style: styles.header }}
        backgroundColor="transparent"
      />
      <View style={{marginTop:20}}>
        <Input placeholder='Enter the bug' />
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
  Send
</Button>
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
  header:{
    color: '#151617',
    fontSize: 25,
    fontWeight: 600
  },
})