import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import TicketDetails from '../Screens/TicketDetails';

const Stack = createNativeStackNavigator();

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
          height: 83,
          borderRadius: 0,
          color:'transparent',
          opacity: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
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