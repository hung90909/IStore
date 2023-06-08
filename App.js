import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from './Screen/register';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Login from './Screen/login';
import Home from './Screen/home';
import EditUser from './Screen/editUsers';
import addUser from './Screen/addUser';
import Product from './Screen/product/product';
import React, { useState } from 'react';
import typeProduct from './Screen/typeProduct/typeProduct';
import addTypeProduct from './Screen/typeProduct/addTypeProduct';
import editTypeProduct from './Screen/typeProduct/editTypeProduct';
import DetailProduct from './Screen/product/DatailProduct';
import addProduct from './Screen/product/addProduct';
import editProduct from './Screen/product/editProduct';
import Icon from 'react-native-vector-icons/FontAwesome';
import UpdateUser from './Screen/UpdateUser';
import Information from './Screen/information';
import SplashScreen from './Screen/SplashScreen';
import xacNhan from './Screen/order.js/xacNhan';
import thanhCong from './Screen/order.js/thanhCong';
import daHuy from './Screen/order.js/daHuy';
import xuLy from './Screen/order.js/xuLy';

const Tab = createBottomTabNavigator()

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);

  }

  function handleLogout() {
    setIsLoggedIn(false);
    
  }

  function LoginNavigator() {
    return (
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} >
        {/* {(props) => <SplashScreen {...props} setIsLoggedIn={setIsLoggedIn} />} */}
        </Stack.Screen>
        <Stack.Screen name='Login' options={{ headerShown: false }}>
          {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }


  function UserMain() {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' options={{ headerShown: false }} >
        {(props) => <Home {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name='addUser' component={addUser} options={{ headerShown: false }} />
        <Stack.Screen name='EditUser' component={EditUser} options={{ headerShown: false }} />
        <Stack.Screen name='UpdateUser' component={UpdateUser} options={{ headerShown: false }} />
        <Stack.Screen name='Thông tin cá nhân' component={Information} options={{ }} />
      </Stack.Navigator>
    )
  }
  const Stack = createNativeStackNavigator()
  function ProductMain() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='addTypeProduct' component={addTypeProduct} options={{ tabBarVisible: false }} />
        <Stack.Screen name='editTypeProduct' component={editTypeProduct} options={{ tabBarVisible: false }} />
        <Stack.Screen name='addProduct' component={addProduct} options={{ tabBarVisible: false }} />
        <Stack.Screen name='editProduct' component={editProduct} options={{ tabBarVisible: false }} />
        <Stack.Screen name='DetailProduct' component={DetailProduct} options={{ tabBarVisible: false }} />
      </Stack.Navigator>
    )
  }

  const TabTop = createMaterialTopTabNavigator();

  function ProductNagator() {
    return (
      <TabTop.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { display: route.name === 'Chi tiết' ? 'none' : 'flex' }
      })}
        tabBarOptions={{
          tabStyle: {},
          labelStyle: { fontSize: 16, fontWeight: 'bold' },
          indicatorStyle: { backgroundColor: 'tomato' },
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <TabTop.Screen name="Sản Phẩm" component={Product} />
        <TabTop.Screen name="Loại SP" component={typeProduct} />
        <TabTop.Screen
          name="Chi tiết"
          component={ProductMain}
          screenOptions={() => ({
            tabBarStyle: { display: 'none'}
          })}
        />
      </TabTop.Navigator>
    );
  }

  function orderNagator() {
    return (
      <TabTop.Navigator
      screenOptions={({ route }) => ({

      })}
        tabBarOptions={{
          tabStyle: {},
          labelStyle: { fontSize: 12, fontWeight: 'bold' },
          indicatorStyle: { backgroundColor: 'tomato' },
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <TabTop.Screen name="xacNhan" component={xacNhan} options={{title:"Xác nhận"}}/>
        <TabTop.Screen name="xuLy" component={xuLy} options={{title:"Đang giao"}}/>
        <TabTop.Screen name="thanhCong" component={thanhCong} options={{title:"Thành công"}}/>
        <TabTop.Screen name="daHuy" component={daHuy} options={{title:"Đã hủy"}}/>
       
      </TabTop.Navigator>
    );
  }
  
  
  function MainNavigator() {
    return (
      <Tab.Navigator
        initialRouteName='User'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'User') {
              iconName = focused ? 'user' : 'user-o';
            } else if (route.name === 'Product') {
              iconName = focused ? 'shopping-cart' : 'shopping-basket';
            } else if (route.name === 'Order'){
              iconName = focused ? 'file-text-o' : 'file-text-o';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='User' component={UserMain} options={{ headerShown: false }} />
        <Tab.Screen name='Product' component={ProductNagator} options={{ headerShown: false }} />
        <Tab.Screen name='Order' component={orderNagator} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  )
}