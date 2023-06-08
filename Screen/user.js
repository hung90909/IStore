import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Clothes } from "../API/getAPI"
import { useIsFocused, useRoute } from '@react-navigation/native';
import CustomAlert from '../componet/customAlert';
import Draggable from 'react-native-draggable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
export default function User(props) {
    const nav = useNavigation()
    const navi = props.navigation
    const { item } = props;

    return (
        <View style={{
            justifyContent: "center", alignItems: "center",
            marginTop: 20, position: "relative"
        }}>
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("UpdateUser", { item })
                }}
                style={{
                    backgroundColor: "#1E90FF", padding: 10 , position:"absolute",
                    top:-55 , right:10 ,borderRadius:10
                }}>
                <Text style={{ color: "white", }}>Sửa </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
            {/* <TouchableOpacity 
            onPress={()=>{
                props.setIsLoggedIn(false)
            }}
            style={{ position:"absolute", left:10 , top:0 , 
        backgroundColor:"red" , borderRadius:10 , padding:10}}>
                <Text style={{ color:"white" ,}}>Đăng xuất </Text>
            </TouchableOpacity> */}


            <Image style={{
                width: 100, height: 100, borderRadius: 50, marginTop: 20,
                borderColor: "gray", borderWidth: 1
            }} source={{ uri: item.image }} />
            <Text style={{ marginTop: 20, fontWeight: "normal", fontSize: 20 }}>Thông tin chi tiết</Text>
            <View style={{
                width: 300, minHeight: 150, backgroundColor: "white",
                marginTop: 20, borderRadius: 20
            }}>
                <View style={{
                    flexDirection: "row", alignItems: "center", marginStart: 20,
                    marginTop: 20
                }}>
                    <Icon name="mail" size={30} color="gray" />
                    <Text style={{ marginLeft: 10 }}>{item.email}</Text>
                </View>
                <View style={{
                    flexDirection: "row", alignItems: "center", marginStart: 20,
                    marginTop: 10
                }}>
                    <Icon name="calendar" size={30} color="gray" />
                    <Text style={{ marginLeft: 10 }}>{item.date}</Text>
                </View>

            </View>

        </View>
    )
}