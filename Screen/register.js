import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React,{useState } from 'react';
import {API_Clothes} from "../API/getAPI"
export default function Register(props) {
    const nav = props.navigation
    const [email , setEmail] = useState('')
    const [passWord , setPassword] = useState('')
    const [name , setName] = useState('')
    const [image , setImage] = useState('')
    const [errorEmails , setErrorEmails] = useState('')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("passWord", passWord);
    
    // formData.append("image", fileInputRef.current.files[0]);
    const onRegister = () =>{
     fetch(API_Clothes+"/dangkyAdmin",{
        method: 'POST',
        body : formData,
        Headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',

          } 
     })
      .then(item =>{
        if(!item.ok){
            setErrorEmails("Email đã tồn tại !")
        }else{
            nav.navigate("Login")
        }
      })
     .catch(err => 
        console.error(err))
    }
    return (
        <View style={{ backgroundColor: " rgb(186, 186, 186)", flex: 1, paddingHorizontal: 30,
        alignItems:"center",justifyContent:"center", }}>
            <View style={{
                width: "100%", backgroundColor: "white", minHeight: 450, 
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 20,
                }}>Đăng Ký</Text>
                <View style={{ marginTop: 20 }}>
                    <Text>Email:</Text>
                    <TextInput
                    onChangeText={(text)=>{
                        setEmail(text);
                    }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Email' />
                       {errorEmails && <Text style={{color:"red"}}>{errorEmails}</Text>}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Password:</Text>
                    <TextInput
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Password' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Name:</Text>
                    <TextInput
                    onChangeText={(text)=>{
                        setName(text);
                    }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Name' />
                </View>
                <View style={{marginTop:10 , flexDirection:"row", 
            alignItems:"center"}}>
                    <Image style={{
                        width:30 , height:30
                    }} source={require("../assets/camera.png")} />
                    <Text style={{marginLeft:10}}>Thêm ảnh </Text>
                </View>
                <View style={{ marginTop: 20 , flexDirection:"row" }}>
                    <TouchableOpacity 
                    onPress={()=>{
                      onRegister() 
                    }}
                    style={{
                         backgroundColor: "#337ab7",
                        justifyContent: "center", alignItems: "center", borderRadius: 7
                    }}>
                        <Text style={{ color: "white", padding: 10 }}>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{
                        nav.navigate("Login")
                    }}
                     style={{
                         backgroundColor: "#5bc0de", marginLeft:10,
                        justifyContent: "center", alignItems: "center", borderRadius: 7
                    }}>
                        <Text style={{ color: "white", padding: 10 }}>Đăng Nhập</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}