import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Clothes } from "../API/getAPI"
import { useIsFocused } from '@react-navigation/native';
import CustomAlert from '../componet/customAlert';
import Draggable from 'react-native-draggable';
export default function Home(props) {
    const nav = props.navigation
    const [alertVisible, setAlertVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [id, setID] = useState('');
    const [data, setData] = useState([])
    const status = useIsFocused()
    const getAPI = () => {
        fetch(API_Clothes + "/getUsers")
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.error(err))
    }
    const onDelete = (id) => {
        fetch(API_Clothes + "/delete/" + id)
            .then(() => getAPI())
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getAPI()
    }, [status])

    const handleDeleteUser = (id) => {
        setID(id)
        setAlertVisible(true);
    };

    const handleCancelPressed = () => {
        setAlertVisible(false);
    };

    const onSearch = () => {
        fetch(API_Clothes + "/search?search=" + search, {
            Headers: {
                "Content-Type": "application/json"
            }
        })
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.log(err))
    }
    return (
        <SafeAreaView style={{ backgroundColor: "rgb(186, 186, 186)", flex: 1, marginTop: 20 }}>
            {/* <TouchableOpacity
            onPress={()=>{
                props.setIsLoggedIn(false);
            }}>
                <Text>dang xuat</Text>
            </TouchableOpacity> */}
            <View style={{paddingHorizontal:20}}>
                <TextInput
                    onSubmitEditing={onSearch}
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                    placeholder='Search...' style={{
                        width: "100%", height: 40, marginTop: 10
                        , backgroundColor: "white", borderRadius: 20, paddingStart: 20
                    }} />
                <TouchableOpacity
                    onPress={() => {
                        onSearch()
                    }}
                    style={{ position: "absolute", top: 16, right: 35, }}>
                    <Image style={{
                        width: 30, height: 30,
                    }} source={require("../assets/search.png")} />
                </TouchableOpacity>
            </View>

            <View style={{width:"100%", height:15 , backgroundColor:"white", marginTop:10}}/>
            <FlatList
                style={{  paddingHorizontal: 20 }}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            marginTop: 20, flexDirection: "row", alignItems: "center", borderBottomWidth: 2, borderColor: "white"
                            , paddingBottom: 20
                        }}>
                            <View style={{ flexDirection: "row", }}>
                                <Image style={{
                                    width: 50, height: 50, borderRadius: 25
                                }} source={{ uri: item.image ? item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6s4SCIVOgCZ--nOzt4HdgdrN4JohCfh5GQ&usqp=CAU" }} />
                                <View style={{ marginStart: 10, alignSelf: "flex-start" }}>
                                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                    <Text style={{ fontWeight: "300" }}>{item.email}</Text>
                                </View>

                            </View>
                            <View style={{
                                flexDirection: "row", backgroundColor: "white", padding: 10,
                                borderRadius: 40, alignItems: "flex-end", position: "absolute", right: 0, bottom: 17
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        nav.navigate("EditUser", { item })
                                    }}
                                >
                                    <Image style={{ width: 30, height: 30, marginRight: 15, }} source={require("../assets/edit.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDeleteUser(item._id)
                                    }}>
                                    <Image style={{ width: 30, height: 30 }} source={require("../assets/delete.png")} />
                                </TouchableOpacity>
                                <CustomAlert
                                    visible={alertVisible}
                                    title="Thông báo"
                                    message="Bạn có chắn chẵn muốn xóa không ?"
                                    onCancelPressed={handleCancelPressed}
                                    onOkPressed={() => {
                                        onDelete(id)
                                        setAlertVisible(false);
                                    }}
                                />
                            </View>
                        </View>

                    )
                }}
            />
            <Draggable
                x={340}
                y={570}
                z={1}
                reverse={false}
            >
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate("addUser")
                    }}>
                    <Image style={{
                        width: 50, height: 50, borderRadius: 20,
                        right: 0, position: "absolute", bottom: 10
                    }} source={require("../assets/add-user.png")} />
                </TouchableOpacity>
            </Draggable>

        </SafeAreaView>
    )
}