import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Clothes } from "../API/getAPI"
import { useIsFocused, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
export default function Information(props) {
    const route = useRoute()
    const { checkRole } = route.params

    const [image, setImage] = useState(checkRole.image)
    const [email, setEmail] = useState(checkRole.email)
    const [date, setDate] = useState(checkRole.date)
    const [name, setName] = useState(checkRole.name)
    const [showSave, setShowSave] = useState(false)
    const formData = new FormData();
    formData.append("image", image)
    formData.append("email", email)
    formData.append("date", date)
    formData.append("name", name)
    const onUpdate = (id) => {
        fetch(API_Clothes + "/inserUsers" + "/" + id, {
            method: "PUT",
            body: formData,
            Headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                showToast()
            })
            .catch(err => console.log(err))
    }


    const showToast = () => {
        ToastAndroid.show('Update thành công !', ToastAndroid.LONG);
    };

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
            setShowSave(true)
        }
    };
    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Image style={{
                width: 130, height: 130, borderRadius: 75
            }} source={{ uri: image }} />
            <TouchableOpacity
                onPress={() => {
                    pickImage()
                }}
                style={{
                    position: "absolute", top: 120, right: 125, backgroundColor: "gray", padding: 5,
                    borderRadius: 20
                }}>
                <Image
                    style={{
                        width: 25, height: 25,
                        tintColor: "white"
                    }} source={require("../assets/updateCamera.png")} />
            </TouchableOpacity>
            <TextInput style={{
                borderBottomWidth: 1, marginTop: 15, height: 40, fontSize: 20, width: "50%", textAlign: "center"
            }} value={name}
                onChangeText={(text) => {
                    setName(text)
                    setShowSave(true)
                }}
            />
            <TextInput style={{
                borderBottomWidth: 1, marginTop: 15, height: 40, fontSize: 20, width: "50%", textAlign: "center"
            }} value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    setShowSave(true)
                }} />
            <TextInput style={{
                borderBottomWidth: 1, marginTop: 15, height: 40, fontSize: 20, width: "50%", textAlign: "center"
            }} value={date}
                onChangeText={(text) => {
                    setDate(text)
                    setShowSave(true)
                }}
            />
            {showSave && <TouchableOpacity
                onPress={() => {
                    onUpdate(checkRole._id)
                }}
                style={{
                    marginTop: 30, backgroundColor: "#337ab7", padding: 10, borderRadius: 10
                }}>
                <Text style={{
                    color: "white"
                }}>Lưu</Text>
            </TouchableOpacity>}
        </View>
    )
}