import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Product } from '../../API/getAPI';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import GridView from './GridView';
import CustomAlert from '../../componet/customAlert';
export default function Product() {
    const status = useIsFocused()
    const nav = useNavigation()
    const [data, setData] = useState([])
    const [loaiSP, setLoaiSP] = useState([])
    const getAPI = () => {
        fetch(API_Product + "/getAllProducts")
            .then(item => item.json())
            .then(item => setData(item))
            .catch(err => console.error(err))
    }
    const getLoaiSP = () => {
        fetch(API_Product + "/add")
            .then(item => item.json())
            .then(item => setLoaiSP(item))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAPI()
        getLoaiSP()
    }, [status])

    const onDelete = (id) => {
        fetch(API_Product + "/deleteProduct" + "/" + id)
            .then(() => getAPI())
            .catch(err => console.log(err))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <GridView
                            onDetail={() => {
                                nav.navigate("DetailProduct", { item, loaiSP })
                            }}
                            onDelete={onDelete}
                            item={item} soLuongSP={item.soLuongSP} />
                    )
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    nav.navigate("addProduct", { loaiSP })
                }}
            >
                <Image style={{
                    width: 50, height: 50, position: "absolute"
                    , bottom: 20, right: 20
                }} source={require("../../assets/addProduct.png")} />
            </TouchableOpacity>
        </SafeAreaView>

    )

}