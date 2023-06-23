import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product } from '../../API/getAPI';
import icon from '../../compoment/icon';
import { useRoute } from '@react-navigation/native';
export default function GripView(props) {
  const route = useRoute()
  const { item, onPress } = props


  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num;
    }
  }
  


  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "45%", height: 200, backgroundColor: "#F5F5F5",
        margin: 10
      }}>
      <Image style={{
        width: "100%", height: "60%"
      }} source={{ uri: item.image }} />

      <Text style={{
        marginHorizontal: 10, marginTop: 10, fontSize: 16
      }}>{item.name_product}</Text>

      <View style={{
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
      }}>

        <Text style={{
          marginLeft: 10, color: "red", fontSize: 17
        }}>{item.price}$</Text>

       <Text style={{
          marginRight: 10, fontSize: 12
        }}>Đã bán {formatNumber(item.sold)}</Text>
      </View>
      <View style={{
        position: "absolute", backgroundColor: "#FFD700", width: 40, height: 40,
        right: 0, justifyContent: "center", alignItems: "center",
      }}>
        <Text style={{ color: "red" }}>50%</Text>
        <Text style={{ color: "white" }}>GIẢM</Text>
      </View>
      {item.soLuongSP <= 0 && <View style={{
                    position:"absolute", top:60,
                    height:40, width:"100%", backgroundColor:"black", borderWidth:2,
                    borderColor:"white", justifyContent:"center", alignItems:"center"
                }}>
                    <Text style={{
                        color:"white", fontWeight:"bold"
                    }}>Đã hết hàng </Text>
                </View> }
    </TouchableOpacity>
  )
}  