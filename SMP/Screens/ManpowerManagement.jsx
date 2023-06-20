import { StyleSheet, Text, View, Dimensions, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, SearchBar, Button, Image, Overlay, ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants'
import ManpowerIcon from '../assets/Manpower.png'
import { addManpower } from '../Redux/action';
import { loadUser } from '../Redux/action';
import PrimaryInput from '../Components/PrimaryInput';

const { width, height } = Dimensions.get('window');

const ManpowerManagement = ({ navigation }) => {

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [name, setName] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [post, setPost] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [employeeID, setEmployeeID] = useState('')
  const [branch, setBranch] = useState('')

  const [visible, setVisible] = useState(false);

  const addManpowerHandler = async () => {
    await dispatch(addManpower(name, post, phoneNumber, employeeID, branch));
    dispatch(loadUser());
    toggleOverlay();
  }

  const handleRefresh = () => {
    setIsRefreshing(true);

    dispatch(loadUser());

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const results = user && user.manpower.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(query.toLowerCase()) ||
        item.employeeID.toLowerCase().includes(query.toLowerCase()) ||
        item.post.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        centerComponent={{ text: 'Management', style: styles.heading }}
        centerContainerStyle={{ width: 350 }}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [COLORS.SECONDARY_LG1, COLORS.SECONDARY_LG2],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
      />
      <SearchBar
        platform="ios"
        containerStyle={{ backgroundColor: 'white', width: width / 1.05, alignSelf: 'center', borderRadius: 20, opacity: 0.95, marginTop: 10, height: 70, borderWidth: 1, borderColor: '#D6D8DC' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        inputStyle={{}}
        lightTheme
        round
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        placeholder="Search"
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => setSearchQuery("")}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={{ marginVertical: 10, flexDirection: 'row', alignSelf: 'center' }}>
        <Button
          title="Add Manpower"
          onPress={toggleOverlay}
          icon={{ name: 'add-circle', type: 'ionicon', size: 18, color: 'black', justifyContent: 'center' }}
          buttonStyle={{
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray'
          }}
          containerStyle={{
            height: 40,
            width: 200,
            marginHorizontal: 50,
            marginTop: 5,
            justifyContent: 'center'
          }}
          titleStyle={{ color: 'black', fontSize: 18 }}
        />

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ width: width - 20, alignItems: 'center', borderRadius: 20 }}>
          <PrimaryInput placeholder="Name" value={name} onChangeText={setName} />
          <PrimaryInput placeholder="Designation" value={post} onChangeText={setPost} />
          <PrimaryInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
          <PrimaryInput placeholder="Branch" value={branch} onChangeText={setBranch} />
          <PrimaryInput placeholder="Employee Code" value={employeeID} onChangeText={setEmployeeID} />
          <Button
            ViewComponent={LinearGradient}
            onPress={addManpowerHandler}
            disabled={!name || !phoneNumber || !employeeID || !post}
            linearGradientProps={{
              colors: [COLORS.SECONDARY_LG1, COLORS.SECONDARY_LG2],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            style={{ width: width - 50, alignSelf: 'center', marginTop: 20 }}
            buttonStyle={{ height: 50, borderRadius: 15 }}
            titleStyle={{ color: 'black', fontWeight: '500' }}
          >
            Submit
          </Button>
        </Overlay>
      </View>

      <View style={{ flex: 1, width: width, alignSelf: 'center', margin: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={searchQuery ? searchResults : user && user.manpower}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <ListItem.Swipeable
              leftWidth={80}
              containerStyle={{
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginVertical: 8,
                marginHorizontal: 0,
                backgroundColor: 'white',
                flexDirection: 'row',
                height: 130,
                width: width / 1.05,
                borderRadius: 20,
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                  width: 6,
                  height: 6,
                },
                shadowColor: '#D6D8DC'
              }}
              style={{ marginVertical: 0 }}
              rightWidth={90}
              minSlideWidth={40}
              leftContent={(action) => (
                <Button
                  containerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    marginVertical: 10,
                    marginHorizontal: 0,
                  }}
                  type="clear"
                  icon={{ name: 'trash', type: 'ionicon', size: 30 }}
                  onPress={action}
                />
              )}
            >
              <Image source={ManpowerIcon} style={{ width: 170, height: 130, marginLeft: -55 }} />
              <ListItem.Content>
                <ListItem.Title style={{fontSize:19, color:'black', marginBottom:5, fontWeight:'bold', opacity:0.7}}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:15}}>{item.post}</ListItem.Subtitle>
                <ListItem.Subtitle>+91 {item.phoneNumber}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontWeight:'bold', marginTop:2}}>{item.branch}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.employeeId}>{item.employeeID}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          )}
        />
      </View>
    </View>
  )
}

export default ManpowerManagement

const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: COLORS.PRIMARY_BG,
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom:50
  },

  heading: {
    color: '#151617',
    fontSize: 22,
    fontWeight: 600,
    alignSelf: 'center'
  },

  employeeId: {
    position: 'absolute',
    top: -15,
    right: 10,
    fontSize: 13,
    color: 'gray',
  },
})