import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Product } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import FiveStar from './FiveStar';

//../../assets/delete.png
export default function DetailProduct(props) {
    const nav = props.navigation;
    const route = useRoute()
    const { item , loaiSP} = route.params
    const idLSP = item.typeProductID
    const [data, setData] = useState([])

    const getAPI = () => {
        fetch(API_Product + "/getNameLSP?idLSP=" + idLSP)
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getAPI()
    }, [])
    return (
        <SafeAreaView>
            <Image style={{ width: "100%", height: 250 }}
                resizeMode='cover'
                source={{ uri: item.image }}
            />
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("Sản Phẩm")
                    nav.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }} style={{
                    position: "absolute", top: 10, left: 10
                }}>
                <Image style={{
                    width: 30, height: 30,
                }} source={require("../../assets/back.png")} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("editProduct", { item , loaiSP })
                }} style={{
                    position: "absolute", top: 10, right: 10
                }}>
                <Image style={{
                    width: 30, height: 30,
                }} source={require("../../assets/edit.png")} />
            </TouchableOpacity>

            <View style={{
                width: "100%", height: 20, backgroundColor: " rgb(186, 186, 186)"
            }} />
            <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <View >
                    <View style={{ flexDirection: "row" , alignItems:"center"}}>
                        <Text style={{
                            fontSize: 25
                        }}>{item.name_product}</Text>
                        {data.map(item => (
                            <Text style={{marginStart:10, color:"green", fontSize:15}}>Loại: {item.product_type}</Text>
                        ))}

                    </View>

                    <Text style={{
                        color: "red", fontSize: 20
                    }}>${item.price}</Text>
                </View>
                <View>
                    <View style={{
                        flexDirection: "row", margin: 10, justifyContent: "center",
                    }}>
                        <FiveStar numberStar={item.review} />
                    </View>
                 { item.sold ? <Text style={{
                        fontSize: 10, position: "absolute", right: 10, top: 20,
                    }}>Đã bán: {item.sold}</Text> :  <Text style={{
                        fontSize: 10, position: "absolute", right: 10, top: 20,
                    }}>Đã bán: 0</Text> }
                </View>

            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mô tả sản phẩm</Text>
                <Text style={{
                    marginTop: 10
                }}>- {item.description}</Text>
            </View>

        </SafeAreaView>


    )
}