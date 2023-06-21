import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const Ticket = ({TicketNumber, Date, ServiceType, CustomerName, Status, Criticality, Open, ticketId, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:12, fontWeight:'bold'}}>{TicketNumber}</Text>
        <Text style={{fontSize:12, color:'gray'}}>{Date}</Text>
      </View>
      <Text style={{marginTop:-10, fontSize:17, fontWeight:'bold'}}>{ServiceType}</Text>
      <Text style={{fontSize:15, marginTop:-12, fontWeight:500}}>{CustomerName}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <Text>{Status} - </Text>
          <Text style={{ color: Criticality === "High" ? 'red' : (Criticality === "Low" ? 'green' : '#FFB327') }}>{Criticality}</Text>
        </View>
        <View>
          <Text style={{color: Open=== "Open" ? '#00377D' : '#FC5622', fontWeight:'bold'}}>{Open}</Text>
        </View>
     </View>
    </View>
    </TouchableOpacity>
  )
}

export default Ticket

const styles = StyleSheet.create({

  ticketContainer:{
    flex:1,
    alignSelf:'center',
    marginTop:0,
  },
  
  item: {
    backgroundColor: 'white',
    padding: 20,
    height:150,
    width:width/1.05,
    alignSelf:'center',
    marginVertical: 8,
    borderRadius: 20,
    justifyContent:'space-between',
    shadowOpacity:1,
    shadowRadius:6,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowColor:'#D6D8DC'
  },
})