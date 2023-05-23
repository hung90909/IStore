import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product } from '../../API/getAPI';
import icon from '../../compoment/icon';
import SlideShow from '../../compoment/slideShowHome';
import GripView from './GridView';
export default function Home(props) {
    const nav = props.navigation
    const getTypeProduct = () => {
        fetch(API_TypeProduct + "/getAllTypeProduct")
            .then(item => item.json())
            .then(item => setData(item))
            .catch(err => console.log(err))
    }
    const getProduct = () => {
        fetch(API_Product + "/getAllProducts")
            .then(item => item.json())
            .then(item => setListSP(item))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTypeProduct()
        getProduct()
    }, [])
    const [data, setData] = useState([])
    const [listSP, setListSP] = useState([])
    return (
        <SafeAreaView style={{ backgroundColor: "#DCDCDC" }}>

            <View style={{
                height: 170, width: "100%"
            }}>
                <SlideShow />
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: 20,
                left: 20,
                right: 20
            }}>
                <TextInput style={{
                    width: "85%",
                    height: 35,
                    backgroundColor: "white",
                    borderRadius: 20
                }} />
                <Image style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: 8,
                    left: 10,
                    tintColor: "gray"
                }} source={icon.search} />
                <Image style={{
                    width: 30,
                    height: 30,
                    marginTop: 2,
                    tintColor: "gray"
                }} source={icon.cart} />
            </View>
            <FlatList
                style={{ backgroundColor: "#F5F5F5", marginTop: 20, 
             }}
                data={data}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                        onPress={()=>{
                            nav.navigate("TypeDetail", {item})
                        }}
                        style={{
                            marginRight: 10, width: 70, height: 70, marginVertical: 10,
                            alignItems: "center", overflow: "hidden"

                        }}>
                            <Image style={{
                                width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "black"
                            }} source={{ uri: item.image }} />
                            <Text numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{
                                    color: "black",
                                }}>{item.product_type}</Text>

                        </TouchableOpacity>
                    )
                }}
            />
            <FlatList
                style={{ backgroundColor: "#DCDCDC" ,height:310}}
                data={listSP}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <GripView item={item} onPress={()=>{
                            nav.navigate("DetailProduct",{item})
                        }} />
                    )
                }}
            />

        </SafeAreaView>
    )
}