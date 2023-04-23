import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function GridView(props) {
    const { item , setOption} = props;
    return (
        <View style={{ alignSelf: "center", justifyContent: "center" ,
         width:"40%", marginHorizontal:10}}>
            <View style={{
                width: 160,
                margin: 10,
                // marginHorizontal:13,
                borderRadius: 14,
                borderWidth: 1,
            }}>

                <Image
                    resizeMode='cover'
                    style={{
                        position: "relative",
                        width: "100%",
                        height: 170,
                        borderRadius: 14,
                    }}
                    source={{ uri: item.image }}
                />
                <Text
                    style={{
                        textAlign:"center",
                        position: "absolute",
                        alignSelf: "center",
                        top: "50%",
                        fontSize: 20,
                        fontWeight: "bold",
                        borderColor: "white",
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        shadowColor: 'black',
                        backgroundColor: "black",
                        shadowOffset: {
                            width: 5,
                            height: 10, // tăng giá trị của shadowOffset
                        },
                        shadowOpacity: 2,
                        shadowRadius: 2,
                        elevation: 5,
                        color: "white",
                    }}>
                    {item.product_type}
                </Text>
                <TouchableOpacity
                 onPress={setOption}
                    style={{
                        position: "absolute",
                        left: 120,
                        top:10,
                        backgroundColor:"white",
                        borderRadius:10,
                        borderColor:"black",
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 10,
                            height: 20, // tăng giá trị của shadowOffset
                        },
                        shadowOpacity: 2,
                        shadowRadius: 1,
                        elevation: 5,
                        borderWidth:1
                        
                    }}>
                    <Image style={{
                        marginHorizontal:5,
                        width: 20,
                        height: 20,
                    }} source={require("../../assets/option.png")} />
                </TouchableOpacity>
            </View>
        </View>

    )
}