import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React,{useState } from 'react';
import {API_Clothes} from "../API/getAPI"
import { useRoute } from '@react-navigation/native';

export default function addUser(props) {
    const nav = props.navigation
    // const route = useRoute()
    // const {item} = route.params
    const [email , setEmail] = useState()
    const [passWord , setPassword] = useState()
    const [name , setName] = useState()
    const [image , setImage] = useState()
    const [errorEmails , setErrorEmails] = useState('')
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("passWord", passWord);
    
    const onAddUser = () =>{
     fetch(API_Clothes+"/inserUsers",{
        method: 'POST',
        body : formData,
        Headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          } 
     })
      .then(repost =>{
         if(!repost.ok){
            setErrorEmails("Email đã tồn tại !")
         }else{
             nav.navigate("Home")
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
                }}>Thêm tài khoản</Text>
                <View style={{ marginTop: 20 }}>
                    <Text>Email:</Text>
                    <TextInput
                    value={email}
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
                    value={passWord}
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
                     value={name}
                    onChangeText={(text)=>{
                        setName(text);
                    }}
                        style={{
                            width: "100%", height: 40, borderWidth: 0.5, marginTop: 5,
                            borderRadius: 6, paddingLeft: 10
                        }}
                        placeholder='Name' />
                </View>
                {image && <Image source={{uri:image}} 
                style={{width:40 , height:40 ,borderRadius:20 , marginTop:10 , borderWidth:2, 
                borderColor:"gray" }}/>}
                <View style={{marginTop:5 , flexDirection:"row", marginTop:15,
            alignItems:"center"}}>
                    <Image style={{
                        width:30 , height:30
                    }} source={require("../assets/camera.png")} />
                    <Text style={{marginLeft:10}}>Thêm ảnh </Text>
                </View>
                <View style={{ marginTop: 20 , flexDirection:"row" }}>
                    <TouchableOpacity 
                    onPress={()=>{
                        onAddUser()
                    }}
                    style={{
                         backgroundColor: "#337ab7",
                        justifyContent: "center", alignItems: "center", borderRadius: 7
                    }}>
                        <Text style={{ color: "white", padding: 10 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{
                        nav.navigate("Home")
                    }}
                     style={{
                         backgroundColor: "#ccc", marginLeft:10,
                        justifyContent: "center", alignItems: "center", borderRadius: 7
                    }}>
                        <Text style={{ color: "white", padding: 10 }}>Cancel</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}