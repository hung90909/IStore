import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity , ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './screen/login';
import Register from './screen/register';
import Home from './screen/Product/home';
import Information from './screen/Information/Information';
import TypeDetail from './screen/Product/typeDetail';
import { useState } from 'react';
import Pay from './screen/Product/pay';
import ThemAddress from './screen/Product/themAddress';
import EditAddress from './screen/Product/editAddress';
import XuLy from './screen/Order.js/xuLy';
import icon from './compoment/icon';
import DangDao from './screen/Order.js/dangDao';
import DaGiao from './screen/Order.js/daGiao';
import DaHuy from './screen/Order.js/daHuy';
import Success from './screen/Product/success';
import DetailProduct from './screen/Product/detailProduct';
import Cart from './screen/CartProduct/cart';


const Stack = createNativeStackNavigator();

export default function App() {
  const [orderCount, setOrderCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false)

  function LoginTab() {
    return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' options={{ headerShown: false }} >
          {(props) => <Login {...props} setIsLogin={setIsLogin} />}
        </Stack.Screen>
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>

    )
  }
  function HomeTab() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='TypeDetail' component={TypeDetail} options={{ headerShown: false }} />
        <Stack.Screen name='DetailProduct' component={DetailProduct} options={{ headerShown: false }} />
        <Stack.Screen name='Cart' component={Cart} options={{ title:"Giỏ hàng" }} />
        <Stack.Screen name='Pay' component={Pay} options={{ title: "Thanh toán" }} >
        </Stack.Screen>
        <Stack.Screen name='ThemAddress' component={ThemAddress} options={{ title: "Thêm địa chỉ" }} />
        <Stack.Screen name='Success' options={{ headerShown:false }} >
        {(props) => <Success {...props} setOrderCount={setOrderCount} orderCount={orderCount} />}
        </Stack.Screen>
        <Stack.Screen name='EditAddress' component={EditAddress} options={{ title: "Sửa địa chỉ" }} />
      </Stack.Navigator>
    )

  }
  function InformationTab() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Information' component={Information} options={{ headerShown: false }} />
      </Stack.Navigator>
    )

  }
  const tabTop = createMaterialTopTabNavigator();
  function orderTab() {
    return (
      <tabTop.Navigator
      tabBarOptions={{
        tabStyle: {},
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        indicatorStyle: { backgroundColor: 'tomato' },
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <tabTop.Screen name="XuLy" component={XuLy} options={{ title: "Xử lý" }} />
        <tabTop.Screen name="DangDao" component={DangDao} options={{ title: "Đang giao" }} />
        <tabTop.Screen name="DaGiao" component={DaGiao} options={{ title: "Đã giao" }} />
        <tabTop.Screen name="DaHuy" component={DaHuy} options={{ title: "Đã hủy" }} />
      </tabTop.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  const handleOrderTabPress = () => {
    setOrderCount(0);
  };

  function MainTab() {
    return (

      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Information') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === "orderTab") {

            iconName = focused ? 'clipboard' : 'clipboard-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
        <Tab.Screen
          name="orderTab"
          component={orderTab}
          options={{
            headerShown: false,
            title: "Order",
            tabBarBadge: orderCount > 0 ? orderCount.toString() : null,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  handleOrderTabPress();
                  props.onPress();
                }}
              />
            ),
          }}
        />

        <Tab.Screen name="Information" component={InformationTab} options={{ headerShown: false, tabBarBadge: 3 }} />
      </Tab.Navigator>

    )
  }

  return (
    <NavigationContainer>
      {isLogin ? <MainTab /> : <LoginTab />}
    </NavigationContainer>
  )



}



