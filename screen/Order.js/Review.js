import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, 
    SafeAreaView, FlatList, Alert  ,Modal , Button} from 'react-native';
import { API_Buyer, API_Clothes, API_DetailOrder } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

export default function Review(){
    return(
        <View>
            <Text>this is review</Text>
        </View>
    )
}