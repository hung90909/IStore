import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { API_TypeClothes } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
export default function AddTypeProduct(props) {
    //  const nav = props.navigation
    const nav = useNavigation();
    // const route = useRoute()
    // const {item} = route.params

    const [product_type, setProduct_type] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    // const [typeProductID , setTypeProductID] = useState("")
    const formData = new FormData();
    formData.append("product_type", product_type);
    // formData.append("typeProductID", typeProductID);
    formData.append("image", image);
    const onClear = () =>{
        setImage("")
        setProduct_type("")
        // setTypeProductID("")
    }
    const onAddUser = () => {
        fetch(API_TypeClothes + "/addTypeProduct", {
            method: 'POST',
            body: formData,
            Headers: {
                "Content-Type": "multipart/form-data"
            }
            })
            .then(reponse =>{
                if(!reponse.ok){
                  setError("Mã sản phẩm đã tồn tại !")
                  onClear()
                }else{
                    onClear()
                    nav.navigate("Loại SP")
                    // nav.reset({
                    //     index: 0,
                    //     routes: [{ name: 'Home' }],
                    //   });
                }
            })
            .catch(err =>
                console.error(err))
                .finally(()=>{
                    console.log('Fetch data is completed.');
                })
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <View style={{
            backgroundColor: " rgb(186, 186, 186)", flex: 1, paddingHorizontal: 30,
            alignItems: "center", justifyContent: "center",
        }}>
            <View style={{
                width: "100%", backgroundColor: "white", minHeight: 300,
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}> Thêm </Text>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30,
                }}>Loại sản phẩm</Text>

                <View style={{ marginTop: 20 }}>
                    {/* <Text>Ma sản phẩm:</Text>
                    <TextInput
                        value={typeProductID}
                        onChangeText={(text) => {
                            setTypeProductID(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Ma sản phẩm' />
                        <Text style={{color:"red"}}>{error}</Text>
                    <Text style={{}}>Tên loại sản phẩm:</Text> */}
                    <TextInput
                        value={product_type}
                        onChangeText={(text) => {
                            setProduct_type(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Tên loại sản phẩm' />
                </View>
                {image && <Image source={{ uri: image }}
                    style={{
                        width: 40, height: 40, borderRadius: 20, marginTop: 10, borderWidth: 2,
                        borderColor: "gray"
                    }} />}
                <View style={{
                    flexDirection: "row", marginTop: 15,
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            pickImage()
                        }}
                    >
                        <Image style={{
                            width: 30, height: 30
                        }} source={require("../../assets/camera.png")} />

                    </TouchableOpacity>
                    <Text style={{ marginLeft: 10 }}>Thêm ảnh </Text>

                </View>
                <View style={{ marginTop: 20, flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            onAddUser()
                        }}
                        style={{
                            backgroundColor: "#337ab7",
                            justifyContent: "center", alignItems: "center", borderRadius: 7
                        }}>
                        <Text style={{ color: "white", padding: 10 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            nav.navigate("Loại SP")
                            // nav.reset({
                            //     index: 0,
                            //     routes: [{ name: 'Home' }],
                            //   });
                        }}
                        style={{
                            backgroundColor: "#ccc", marginLeft: 10,
                            justifyContent: "center", alignItems: "center", borderRadius: 7
                        }}>
                        <Text style={{ color: "white", padding: 10 }}>Cancel</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}