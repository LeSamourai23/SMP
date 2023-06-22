import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import TicketDetails from '../Screens/TicketDetails';

const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

function InHomeNav({ navigation, route }) {

  const tabHiddenRoutes = ["Ticket Details"];

  React.useLayoutEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({
        tabBarStyle: {
          display: 'none'
        },
        headerStyle: {
          display: 'none'
        }
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          position: 'absolute',
          height: Platform.OS === "android" ? 70: 83,
          borderRadius: 0,
          color:'transparent',
          opacity: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.7)',
        }
      });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Main Page">
      <Stack.Screen name="Main Page" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Ticket Details" component={TicketDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default InHomeNav;