import { View, Text, StatusBar, Dimensions, TouchableOpacity, FlatList, RefreshControl, SafeAreaView, Image, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Ticket from '../Components/Ticket'
import Logo from '../assets/logo.png'
import { SearchBar, withBadge, Icon, Card, BottomSheet, ListItem, Button } from '@rneui/themed';
import Loader from '../Components/Loader'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants'
import { login } from '../Redux/action';
import { loadUser } from '../Redux/action'
import SortButtons from '../Components/SortButtons'
import ProfilePhoto from '../assets/ProfilePhoto.png'

const { width, height } = Dimensions.get('window');

const BadgedIcon = withBadge()(Icon);

const Home = ({ navigation }) => {

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const { user } = useSelector(state => state.auth)

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  /*     const [sortingParam, setSortingParam] = useState(null);
      const [sortingOrder, setSortingOrder] = useState('asc'); */

  const openTicketsCount = user && user.getTicket.filter(item => item.open === "Open").length;
  const closedTicketsCount = user && user.getTicket.filter(item => item.open === "Closed").length;

  const handleSearch = (query) => {
    setSearchQuery(query);

    const results = user && user.getTicket.filter(
      (item) =>
        item.customer.first_name.toLowerCase().includes(query.toLowerCase()) ||
        item.customer.last_name.toLowerCase().includes(query.toLowerCase()) ||
        (item.customer.first_name.toLowerCase() + " " + item.customer.last_name.toLowerCase()).includes(query.toLowerCase()) ||
        item.ticket_no.toLowerCase().includes(query.toLowerCase()) ||
        item.CriticalityNumber.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    dispatch(loadUser());

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar translucent barStyle='dark-content' />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: -1 }}
        colors={[COLORS.SECONDARY_LG1, COLORS.SECONDARY_LG2]}
        style={styles.SearchBarContainer}
        accessibilityRole="none">

        <View style={{ margin: -10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={toggleBottomSheet}>
            <Icon name="person-circle" type="ionicon" size={35} />
            <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
              <View style={{ backgroundColor: COLORS.PRIMARY_BG, height: height / 2, borderRadius: 20 }}>

                <TouchableOpacity style={{ alignSelf: 'flex-start', margin: 5 }} onPress={() => setIsVisible(false)}>
                  <Icon name="close" type="ionicon" size={40} />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -20, alignSelf: 'center' }}>
                  <Image source={ProfilePhoto} style={{ height: 120, width: 120, alignSelf: 'center', marginVertical: 20}} />
                  <Text style={{ fontSize: 20, marginTop: 15, fontWeight: 'bold' }}>{user.name}</Text>
                  <Text style={{ fontSize: 17, marginTop: 3 }}>{user.email}</Text>
                  <Text style={{ marginTop: 5 }}>{user._id}</Text>
                </View>
              </View>
            </BottomSheet>
          </TouchableOpacity>
          <Image source={Logo} style={{ height: 100, width: 220, alignSelf: 'center', marginHorizontal: 20 }} />
          <BadgedIcon name="notifications" type="ionicon" size={35} />
        </View>

        <SearchBar
          platform="ios"
          containerStyle={{
            backgroundColor: 'white', 
            width: width / 1.12, 
            alignSelf: 'center', 
            borderRadius: 20, 
            opacity: 0.95, 
            height: 70, 
          }}
          inputContainerStyle={{ backgroundColor: 'white',  }}
          inputStyle={{}}
          lightTheme
          round
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onClearText={() => console.log(onClearText())}
          placeholder="Search"
          placeholderTextColor="#888"
          cancelButtonTitle="Cancel"
          cancelButtonProps={{}}
          onCancel={() => setSearchQuery("")}
          value={searchQuery}
          onChangeText={handleSearch}
        />

      </LinearGradient>
      {/*         <ScrollView style={styles.filterContainer} horizontal showsHorizontalScrollIndicator={false}>
          <SortButtons title={"Most Recent"} onPress={{}}/>
          <SortButtons title={"Criticality"} onPress={() => handleSorting('item.ticket.criticality')}/>
          <SortButtons title={"Customer Name"} onPress={() => handleSorting('item.customer.name')}/>
        </ScrollView> */}
      <View style={styles.squareContainer}>
        <Card containerStyle={styles.square}>
          <Card.Title style={{ color: COLORS.LOGIN_LG1,  }}>Open Tickets</Card.Title>
          <Text style={{ alignSelf: "center", fontSize: 20 }}>{openTicketsCount}</Text>
        </Card>
        <Card containerStyle={styles.square}>
          <Card.Title style={{ color: "red" }}>Closed Tickets</Card.Title>
          <Text style={{ alignSelf: "center", fontSize: 20 }}>{closedTicketsCount}</Text>
        </Card>
      </View>
      <View style={{ flex: 1, marginBottom: 50, width: width, alignSelf: 'center', marginTop: 0 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={searchQuery ? searchResults : user && user.getTicket}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <Ticket
              key={item._id}
              TicketNumber={item.ticket_no}
              Date={item.created_on}
              ServiceType={item.serviceType.service_type}
              CustomerName={item.customer.first_name + " " + item.customer.last_name}
              Status={item.ticket_status}
              Criticality={item.CriticalityNumber}
              Open={item.open}
              onPress={() => navigation.navigate("Ticket Details", { item: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_BG,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  SearchBarContainer: {
    opacity: 1,
    height: height / 5,
    width: width / 1.05,
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',

  },
  /* 
      filterContainer:{
        flexDirection:'row',
        width:width/1.08,                                    
        alignSelf:'center',
        marginBottom:20
    }, */

  squareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  square: {
    height: 75,
    width: 170,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 10,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: 'center',
    shadowOpacity:1,
    shadowRadius:6,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowColor:'#D6D8DC'
  }

})