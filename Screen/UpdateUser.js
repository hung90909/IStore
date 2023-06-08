import { StatusBar } from 'expo-status-bar';
import {  Image, TextInput, TouchableOpacity ,DatePickerIOS } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { API_Clothes } from "../API/getAPI"
import { useRoute } from '@react-navigation/native';

export default function UpdateUser(props) {
    const nav = props.navigation
    const route = useRoute()
    const { item } = route.params
    const [email, setEmail] = useState(item.email)
    const [passWord, setPassword] = useState(item.passWord)
    const [name, setName] = useState(item.name)
    const [image, setImage] = useState(item.image)
    const [date, setDate] = useState(item.date)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [errorEmails, setErrorEmails] = useState('')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    // formData.append("passWord", passWord);

    const onEditUser = (id) => {
        fetch(API_Clothes + "/inserUsers" + "/" + id, {
            method: 'PUT',
            body: formData,
            Headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                nav.navigate("Home")
            })  
            .catch(err =>
                console.error(err))
    }
    return (
        <View style={{
            backgroundColor: " rgb(186, 186, 186)", flex: 1, paddingHorizontal: 30,
            alignItems: "center", justifyContent: "center",
        }}>
            <View style={{
                width: "100%", backgroundColor: "white", minHeight: 450,
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}>Cập nhật</Text>
                <View style={{ marginTop: 20 }}>
                    <Text>Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Email' />
                    {errorEmails && <Text style={{ color: "red" }}>{errorEmails}</Text>}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Name:</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Name' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Ngày sinh:</Text>
                    <TextInput
                        value={date}
                        onChangeText={(text)=>{
                          setDate(text)
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Ngày sinh' />
                </View>
                {image && <Image source={{ uri: image }}
                    style={{
                        width: 40, height: 40, borderRadius: 20, marginTop: 10, borderWidth: 2,
                        borderColor: "gray"
                    }} />}
                <View style={{
                    marginTop: 5, flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Image style={{
                        width: 30, height: 30
                    }} source={require("../assets/camera.png")} />
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
                            nav.navigate("Home")
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