import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../Screens/Settings';
import ChangePassword from '../Screens/ChangePassword';
import Report from '../Screens/Report';
import Feedback from '../Screens/Feedback';

const Stack = createNativeStackNavigator();

function InSettingsNav() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name="Change Password" component={ ChangePassword } options={{headerShown: false}}/>
      <Stack.Screen name="Report" component={ Report } options={{headerShown: false}}/>
      <Stack.Screen name="Feedback" component={ Feedback } options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default InSettingsNav;