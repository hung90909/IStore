import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { API_Clothes } from "../API/getAPI"
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login(props) {
    const nav = props.navigation
    const [email, setEmail] = useState('hung@gmail.com')
    const [passWord, setPassword] = useState('123')
    const [rote , setRote] = useState(null)
    // const [errorEmails , setErrorEmails] = useState('')
    const [error, setError] = useState('')



    const formData = new FormData();
    formData.append("email", email);
    formData.append("passWord", passWord);
    const onLogin = async () => {
        try{
             const data = {
            email: email,
            passWord: passWord
        };
        const response = await fetch(API_Clothes + "/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const datas = await response.json();
        AsyncStorage.setItem('data', JSON.stringify(datas));
        props.setIsLoggedIn(true);
        }catch (e) {
            setError(e.message);
          }
    }

    // const checkAdmin = (datas) =>{
    //     console.log(datas.role)
    //      if(datas.rote === "admin"){
         
    //      }else{
    //         props.setIsLoggedIn(true);
    //      }
    // }


    return (
        <View style={{
            backgroundColor: " rgb(186, 186, 186)", flex: 1, paddingHorizontal: 30,
            alignItems: "center", justifyContent: "center",
        }}>
            <View style={{
                width: "100%", backgroundColor: "white", minHeight: 320,
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}>Đăng Nhập</Text>
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

                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Password:</Text>
                    <TextInput
                        value={passWord}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Password' />
                </View>
                {error && <Text style={{ color: "red", marginTop: 6 }}>{error}</Text>}
                <View style={{
                    flexDirection: "row",
                }}>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                onLogin()
                            }}
                            style={{
                                backgroundColor: "#337ab7",
                                justifyContent: "center", alignItems: "center", borderRadius: 7
                            }}>
                            <Text style={{ color: "white", padding: 10 }}>Đăng Nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate("register")
                            }}
                            style={{ alignSelf: "center", marginLeft: 10 }}>
                            <Text>Chưa có tài khoản ? </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </View>
    )
}