import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing   } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
function SplashScreen({navigation}) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={require("../assets/logo.png")} style={{}} />
        <Text style={{ fontSize: 30, position: 'absolute', bottom: 5, 
      left:55 }}>
          <Animated.Text style={{ color: '#337ab7', fontWeight: 'bold' }}>
            Clothes{' '}
          </Animated.Text>
          <Animated.Text style={{ color: 'gray', fontWeight: 'bold' }}>
            Shop
          </Animated.Text>
        </Text>
      </Animated.View>
    </View>
  );
  
}

export default SplashScreen;
