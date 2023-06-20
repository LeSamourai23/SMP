import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import { View, Text, StyleSheet, Image } from 'react-native'
import ManpowerManagement from '../Screens/ManpowerManagement'
import Settings from '../Screens/Settings'
import {LinearGradient} from 'expo-linear-gradient';
import { COLORS } from '../Constants/constants';
import { Icon } from '@rneui/themed';
import InHomeNav from './InHomeNav';
import InSettingsNav from './InSettingsNav';

const Tab = createBottomTabNavigator();

function InAppNav() {
  return (
    <Tab.Navigator screenOptions={()=>({
        headerShown:false,
        headerStyle: styles.headerStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor:'black',
        tabBarShowLabel: true,
        tabBarBackground: () => (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: -1 }}
                colors={[COLORS.LOGIN_LG1, COLORS.LOGIN_LG2]}
                height={83}
              />
        )
    })
    }>
      <Tab.Screen name="Home" component={InHomeNav} options={{headerShown:false, tabBarIcon:({focused})=> (<Icon name="home" type="ionicon" color={focused? '#d5dfeb': '#151617'} size={30}/>)}}/>
      <Tab.Screen name="Manpower Management" component={ManpowerManagement} options={{headerShown:false, tabBarIcon:({focused})=> (<Icon name="people" type="ionicon" color={focused? '#d5dfeb': '#151617'} size={30}/>)}}/>
      <Tab.Screen name="Settings" component={InSettingsNav} options={{headerShown:false, tabBarIcon:({focused})=> (<Icon name="settings" type="ionicon" color={focused? '#d5dfeb': '#151617'} size={30}/>)}}/>
    </Tab.Navigator>
  );
}

export default InAppNav;

const styles = StyleSheet.create({
    tabBarStyle:{
        position: 'absolute',
        height:83,
        borderRadius:0,
        opacity:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,0.7)',
    },

    headerStyle:{
      height:100,
      
    }
})