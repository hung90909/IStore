import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { API_Clothes } from "../API/getAPI"
import { validateEmail, valadatePassword } from './checkInput';
export default function Register(props) {
    const nav = props.navigation
    const [email, setEmail] = useState('')
    const [passWord, setPassword] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [errorEmails, setErrorEmails] = useState('')
    const [errorPass, setErrorPass] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorDate, setErrorDate] = useState('')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("passWord", passWord);
    formData.append("image", image);
    formData.append("date", date);

    // formData.append("image", fileInputRef.current.files[0]);
    const onRegister = () => {
        fetch(API_Clothes + "/dangkyAdmin", {
            method: 'POST',
            body: formData,
            Headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        })
            .then(item => {
                if (!item.ok) {
                    setErrorEmails("Email đã tồn tại !")
                } else {
                    nav.navigate("Login")
                }
            })
            .catch(err =>
                console.error(err))
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

    const checkValidate = () => {
        if (name !== "" && date !== "" && errorName === "" && errorDate ===""
            && valadatePassword(passWord) && validateEmail(email)) {
            return true
        } else {
            return false
        }
    }
    return (
        <View style={{
            backgroundColor: " rgb(186, 186, 186)", flex: 1, paddingHorizontal: 30,
            alignItems: "center", justifyContent: "center",
        }}>
            <View style={{
                width: "100%", backgroundColor: "white", minHeight: 500,
                borderRadius: 20, paddingHorizontal: 20, paddingVertical: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}>Đăng Ký</Text>
                <View style={{ marginTop: 20 }}>
                    <Text>Email:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            if (validateEmail(text)) {
                                setEmail(text);
                                setErrorEmails('')
                            } else {
                                setErrorEmails("email is not validated");
                            }
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Email' />
                    {errorEmails && <Text style={{ color: "red" }}>{errorEmails}</Text>}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Password:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            if (valadatePassword(text)) {
                                setPassword(text);
                                setErrorPass("")
                            } else {
                                setErrorPass("Password is not validated")
                            }

                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Password' />
                    {errorPass && <Text style={{ color: "red" }}>{errorPass}</Text>}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Name:</Text>
                    <TextInput
                        onChangeText={(text) => {
                            if (text) {
                                setName(text);
                                setErrorName("")
                            } else {
                                setErrorName("Name is not validated")
                            }

                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Name' />
                    {errorName && <Text style={{ color: "red" }}>{errorName}</Text>}
                </View>
                {image && <Image style={{
                    width: 40, height: 40, borderRadius: 20, marginTop: 10
                }} source={{ uri: image }} />}
                <View style={{
                    flexDirection: "row", alignItems: "center",
                    justifyContent: "space-between", marginTop: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                pickImage()
                            }}>
                            <Image style={{
                                width: 30, height: 30
                            }} source={require("../assets/camera.png")} />
                        </TouchableOpacity>

                        <Text style={{ marginLeft: 10 }}>Thêm ảnh </Text>
                    </View>

                    <View style={{}}>
                        <Text>Date:</Text>
                        <TextInput
                            onChangeText={(text) => {
                                if (text) {
                                    setDate(text);
                                    setErrorDate("")
                                } else {
                                    setErrorDate("Date is not validated")
                                }

                            }}
                            style={{
                                width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                                borderRadius: 6, paddingLeft: 10, width: 100
                            }}
                            keyboardType="numeric"
                            placeholder='dd/mm/yyyy' />
                        {errorDate && <Text style={{
                            color: "red", fontSize: 10,
                            textAlign: "center"
                        }}>{errorDate}</Text>}
                    </View>

                </View>


                <View style={{ marginTop: 20, flexDirection: "row" }}>
                    <TouchableOpacity
                    disabled={checkValidate() ? false : true}
                        onPress={() => {
                            if (checkValidate()) {
                                onRegister()
                            }
                        }}
                        style={{
                            backgroundColor: checkValidate() ? "#337ab7" : "gray",
                            justifyContent: "center", alignItems: "center", borderRadius: 7
                        }}>
                        <Text style={{ color: "white", padding: 10 }}>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            nav.navigate("Login")
                        }}
                        style={{
                            backgroundColor: "#5bc0de", marginLeft: 10,
                            justifyContent: "center", alignItems: "center", borderRadius: 7
                        }}>
                        <Text style={{ color: "white", padding: 10 }}>Đăng Nhập</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}