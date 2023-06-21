import { StyleSheet, Text, View, Dimensions, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, SearchBar, Button, Image, Overlay, ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../Constants/constants'
import ManpowerIcon from '../assets/Manpower.png'
import { addManpower, deleteManpower } from '../Redux/action';
import DropDownPicker from 'react-native-dropdown-picker';
import { loadUser } from '../Redux/action';
import PrimaryInput from '../Components/PrimaryInput';

const { width, height } = Dimensions.get('window');

const ManpowerManagement = ({ navigation }) => {

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [FirstName, setFirstName] = useState('')
  const [MiddleName, setMiddleName] = useState('')
  const [LastName, setLastName] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [designation, setDesignation] = useState('')
  const [MobileNumber, setMobileNumber] = useState('')
  //const [branch, setBranch] = useState('')
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Service Computer Operator', value: 'Service Computer Operator' },
    { label: 'Installer', value: 'Installer' },
    { label: 'Senior Mechanic', value: 'Senior Mechanic' },
    { label: 'Mechanic', value: 'Mechanic' },
    { label: 'Junior Mechanic', value: 'Junior Mechanic' },
    { label: 'Helper', value: 'Helper' },
    { label: 'Foreman', value: 'Foreman' },
    { label: 'Assisstant Salesman', value: 'Assisstant Salesman' },
    { label: 'Salesman', value: 'Salesman' },
    { label: 'Service Manager', value: 'Service Manager' },

  ]);

  const [visible, setVisible] = useState(false);

  const addManpowerHandler = async () => {
    const EmpCode = Math.floor(10000 + Math.random() * 90000);
    const branch = user.name
    dispatch(addManpower(FirstName, MiddleName, LastName, designation, MobileNumber, branch, EmpCode));
    dispatch(loadUser());
    toggleOverlay();
  }

  const deleteManpowerHandler = (ECode) => {
    //console.log(ECode)
    dispatch(deleteManpower(ECode));
    dispatch(loadUser());
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

    const results = user && user.findAllEmployees.filter(
      (item) =>
        item.FirstName.toLowerCase().includes(query.toLowerCase()) ||
        item.MiddleName.toLowerCase().includes(query.toLowerCase()) ||
        item.LastName.toLowerCase().includes(query.toLowerCase()) ||
        item.MobileNumber.toLowerCase().includes(query.toLowerCase()) ||
        item.EmpCode.toLowerCase().includes(query.toLowerCase()) ||
        item.desingation.toLowerCase().includes(query.toLowerCase())
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

        <Overlay pointerEvents="none" isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ width: width - 20, alignItems: 'center', borderRadius: 20 }}>
          <PrimaryInput placeholder="First Name" value={FirstName} onChangeText={setFirstName} />
          <PrimaryInput placeholder="Middle Name" value={MiddleName} onChangeText={setMiddleName} />
          <PrimaryInput placeholder="Last Name" value={LastName} onChangeText={setLastName} />
          <DropDownPicker
            open={open}
            value={designation}
            items={items}
            setOpen={setOpen}
            textStyle={{
              fontSize: 18,
              color: 'white',
              marginLeft: 10
            }}
            placeholder="Designation"
            placeholderStyle={{
              color: COLORS.PLACEHOLDER,
              marginLeft: 10,
              fontSize: 18
            }}
            labelStyle={{
              color: "white"
            }}
            arrowIconStyle={{
              width: 20,
              height: 20,
              
            }}
            tickIconStyle={{
              width: 20,
              height: 20,
            }}
            setValue={setDesignation}
            dropDownContainerStyle={{
              backgroundColor: COLORS.INPUT_CONTAINER,
              borderWidth: 0,
              width: width - 50,
              marginTop: 13,
              alignSelf: 'center'
            }}

            setItems={setItems}
            style={{
              backgroundColor: COLORS.INPUT_CONTAINER,
              borderRadius: 15,
              height: 60,
              width: width - 50,
              alignSelf: 'center',
              borderWidth: 0,
              marginVertical: 12,
              padding: 20
            }}
          />
          <PrimaryInput placeholder="Phone Number" value={MobileNumber} onChangeText={setMobileNumber} />
          <PrimaryInput value={user.name} />
          <Button
            ViewComponent={LinearGradient}
            onPress={addManpowerHandler}
            disabled={!FirstName || !MobileNumber || !designation || !LastName}
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
      </View >

      <View style={{ flex: 1, width: width, alignSelf: 'center', margin: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={searchQuery ? searchResults : user && user.findAllEmployees}
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
              leftContent={() => (
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
                  onPress={() => deleteManpowerHandler(item.EmpCode)}
                />
              )}
            >
              <Image source={ManpowerIcon} style={{ width: 170, height: 130, marginLeft: -55 }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontSize: 19, color: 'black', marginBottom: 5, fontWeight: 'bold', opacity: 0.7 }}>{item.FirstName + " " + item.LastName}</ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 15, marginBottom: 2 }}>{item.designation}</ListItem.Subtitle>
                <ListItem.Subtitle>+91 {item.MobileNumber}</ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontWeight: 'bold', marginTop: 2 }}>{item.branch}</ListItem.Subtitle>
                <ListItem.Subtitle style={styles.employeeId}>{item.EmpCode}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          )}
        />
      </View>
    </View >
  )
}

export default ManpowerManagement

const styles = StyleSheet.create({

  mainContainer: {
    backgroundColor: COLORS.PRIMARY_BG,
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 80
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

  dropdownContainer: {
    backgroundColor: '#6d8fba',
    opacity: 1,
    color: 'white',
    height: 60,
    width: '100%',
    borderRadius: 15,
    padding: 20,
    margin: 12,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontSize: 18,
    zIndex: 1
  },
})