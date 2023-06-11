import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { API_Product } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
export default function EditProduct(props) {
    //  const nav = props.navigation
    const nav = useNavigation();
    const route = useRoute()
    const { item, loaiSP } = route.params

    const [name_product, setName_product] = useState(item.name_product)
    const [code_product, setCode_product] = useState(item.code_product)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)
    const [typeProductID, setTypeProductID] = useState(item.typeProductID);
    const [image, setImage] = useState(item.image)
    const formData = new FormData();
    formData.append("name_product", name_product);
    formData.append("code_product", code_product);
    formData.append("typeProductID", typeProductID);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    const onClear = () => {
        setImage("")
        setName_product("")
    }
    const onEditUser = (id) => {
        fetch(API_Product + "/updateProduct" + "/" + id, {
            method: 'PUT',
            body: formData,
            Headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                onClear()
            })
            .then(() => {
                nav.navigate("Sản Phẩm")
            })
            .then(() => {
                nav.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            })
            .catch(err =>
                console.error(err))
            .finally(() => {
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
                width: "100%", backgroundColor: "white", minHeight: 500,
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}> Sửa Sản phẩm</Text>
                <View style={{ marginTop: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <View style={{ width: "25%" }}>
                            <Text>MÃ SP:</Text>
                            <TextInput
                                value={code_product}
                                onChangeText={(text) => {
                                    setCode_product(text);
                                }}
                                style={{
                                    width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                                    borderRadius: 6, paddingLeft: 10
                                }}
                                placeholder='Mã SP' />
                        </View>
                        <View style={{ width: "70%", marginLeft: 10, marginBottom: 10 }}>
                            <Text style={{ marginTop: 10 }}>Tên SP:</Text>
                            <TextInput
                                value={name_product}
                                onChangeText={(text) => {
                                    setName_product(text);
                                }}
                                style={{
                                    width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                                    borderRadius: 6, paddingLeft: 10
                                }}
                                placeholder='Tên SP' />
                        </View>

                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"30%"}}>
                            <Text style={{}}>Giá SP:</Text>
                            <TextInput
                                keyboardType="numeric"
                                value={price.toString()}
                                onChangeText={(text) => {
                                    setPrice(text);
                                }}
                                style={{
                                    width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                                    borderRadius: 6, paddingLeft: 10
                                }}
                                placeholder='Giá sản phẩm' />
                        </View>
                        <Picker
                            style={{ width: "70%" }}
                            selectedValue={typeProductID}
                            onValueChange={(itemValue) => setTypeProductID(itemValue)}
                            className="form-control"
                        >
                            {loaiSP.map((item) => (
                                <Picker.Item
                                    key={item._id}
                                    label={item.product_type}
                                    value={item._id}
                                />
                            ))}
                        </Picker>
                    </View>


                    <Text style={{ marginTop: 10 }}>Mô tả:</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Mô tả' />
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
                            onEditUser(item._id)
                        }}
                        style={{
                            backgroundColor: "#337ab7",
                            justifyContent: "center", alignItems: "center", borderRadius: 7
                        }}>
                        <Text style={{ color: "white", padding: 10 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            nav.navigate("Sản Phẩm")
                            nav.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
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