import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './Screen/register';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Login from './Screen/login';
import home from './Screen/home';
import Home from './Screen/home';
import EditUser from './Screen/editUsers';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='EditUser' component={EditUser} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

