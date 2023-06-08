import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList  } from 'react-native';
import React, { useState , useEffect} from 'react';
import { API_Clothes , API_DetailOrder} from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function daHuy(){
    const nav = useNavigation()
    const [list, setList] = useState([])
    const trangThai = useIsFocused()
    const getAllDaHuy = () => {
        fetch(API_DetailOrder + "/getAllOrderHuyDonAdmin")
            .then(item => item.json())
            .then(data => setList(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllDaHuy()
    }, [trangThai])

    return (
        <View style={{ flex: 1, backgroundColor: "#DCDCDC" }}>
            <FlatList
                data={list} 
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: "100%", backgroundColor: "white", height: 160,
                            padding: 10, marginTop: 10
                        }}> 
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{
                                    width: 80, height: 80
                                }} source={{ uri: item.image }} />
                                <Text style={{ marginLeft: 12, fontSize: 20, fontWeight: "bold" }}>{item.nameSP}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between", flex: 1,
                                marginTop: 7
                            }}>
                                <Text>{item.soluongSP} sản phẩm</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 20 }}>Thành tiền: </Text>
                                    <Text style={{ fontSize: 20, color: "red" }}>{item.tongTien}$</Text>
                                </View>

                            </View>
                            <View style={{ position: "absolute", right: 10, top: 37, }}>
                                <Text style={{ fontSize: 16, marginLeft: 30 }}>x{item.soluongSP}</Text>
                                <Text style={{ color: "red", fontSize: 20 }}>{item.giaSP}$</Text>
                            </View>
                            <View style={{flexDirection:"row" , justifyContent:"space-between",
                               alignItems:"center"}}>
                                <Text style={{color:"red"}}>Đơn hàng đã hủy</Text>
                            </View>
                           
                        </View>
                    )
                }}
            />
        </View>
    )
}