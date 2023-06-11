import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Clothes } from "../API/getAPI"
import { useIsFocused } from '@react-navigation/native';
import CustomAlert from '../componet/customAlert';
import Draggable from 'react-native-draggable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './user';
import debounce from 'debounce';
export default function Home(props) {
    const nav = props.navigation
    const getUser = async () => {
        try {
            const datas = await AsyncStorage.getItem('data');
            const parsedDatas = datas != null ? JSON.parse(datas) : null;
            if (parsedDatas != null) {
                setCheckRole(parsedDatas)
                handleLogin(parsedDatas)
                // checkAdmin()
            }


        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const [alertVisible, setAlertVisible] = useState(false);
    const [alerLogOut, setAlertLogOut] = useState(false)
    const [search, setSearch] = useState("");
    const [id, setID] = useState("");
    const [data, setData] = useState([])
    const [checkRole, setCheckRole] = useState({})
    const [loggedInUser, setLoggedInUser] = useState(null);
    const status = useIsFocused()

    const handleLogin = (user) => {
        setLoggedInUser(user);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
    };
    const getAPI = async () => {
        try {
            const response = await fetch(API_Clothes + '/getUsers', {
            });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error)
        }


    }
    const onDelete = (id) => {
        fetch(API_Clothes + "/delete/" + id)
            .then(() => getAPI())
            .catch(err => console.error(err))
    }

    const onCheckDelete = (item) =>{
        if(item.role === "admin"){
            ToastAndroid.show('Bạn không có quyền để xóa người dùng này !', ToastAndroid.LONG,  ToastAndroid.CENTER);
        }else{
            handleDeleteUser(item._id)
        }
    }

    const onCheckUpdate = (item) =>{
        if(item.role === "admin"){
            ToastAndroid.show('Bạn không có quyền để sửa người dùng này !', ToastAndroid.LONG,  ToastAndroid.CENTER);
        }else{
            nav.navigate("EditUser", { item })
        }
    }

    useEffect(() => {
        getAPI()
        getUser()
        checkAdmin()
    }, [status])

    const handleDeleteUser = (id) => {
        setID(id)
        setAlertVisible(true);
    };

    const handleCancelPressed = () => {
        setAlertVisible(false);
    };
    const handleCancelLogOut = () => {
        setAlertLogOut(false);
    };

    const checkAdmin = () => {
        const role = checkRole.role;
        if (role === "admin") {
            return true
        } else {
            return false
        }

    }
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }
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
    const delayedSearch = debounce(onSearch, 10);

    const filteredData = data.filter(item => item._id !== loggedInUser?._id);

    return (
        <SafeAreaView style={{
            backgroundColor: "rgb(186, 186, 186)", flex: 1, 
        }}>

            {!checkAdmin() ?
                <TouchableOpacity
                    style={{
                        backgroundColor: 'red', width: 100, padding: 10, alignItems: "center",
                        marginLeft: 10, marginTop: 10 , borderRadius:10 ,
                    }}
                    onPress={() => {
                        props.setIsLoggedIn(false);
                        handleLogout()
                    }}>
                    <Text style={{ color: "white" }}>Đăng xuất</Text>
                </TouchableOpacity>

                : null}
            {checkAdmin() ? <View>
                <View style={{
                    flexDirection: "row", marginHorizontal: 20, marginTop: 10, alignItems: "center", justifyContent: "space-between",
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center"
                    }}>
                        <TouchableOpacity onPress={() => {
                            nav.navigate("Thông tin cá nhân", { checkRole })
                        }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 2, borderColor: "gray" }}
                                source={{ uri: checkRole.image }} />
                        </TouchableOpacity>

                        <Text style={{
                            fontSize: 20, fontStyle: "italic", marginLeft: 10,
                            color: "white"
                        }}>Hello {checkRole.name} !</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {

                            setAlertLogOut(true);
                          
                        }}>
                        <Image style={{
                            width: 30, height: 30
                        }} source={require("../assets/log_out.png")} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingHorizontal: 20 }}>

                    <TextInput
                        onSubmitEditing={onSearch}
                        onChangeText={(text) => {
                            setSearch(text)
                            delayedSearch();
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

                <View style={{ width: "100%", height: 15, backgroundColor: "white", marginTop: 10 }} />
                <FlatList
                    style={{ paddingHorizontal: 20 }}
                    data={filteredData}
                    keyExtractor={item => item._id}
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
                                            onCheckUpdate(item)
                                          
                                        }}
                                    >
                                        <Image style={{ width: 30, height: 30, marginRight: 15, }} source={require("../assets/edit.png")} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            onCheckDelete(item)
                                           
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
                                    <CustomAlert
                                        visible={alerLogOut}
                                        title="Thông báo"
                                        message="Bạn có muốn đăng xuất không ?"
                                        onCancelPressed={handleCancelLogOut}
                                        onOkPressed={() => {
                                            props.setIsLoggedIn(false);
                                            handleLogout()
                                            setAlertLogOut(false);
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
                            right: 10, position: "absolute", bottom: 10
                        }} source={require("../assets/add-user.png")} />
                    </TouchableOpacity>
                </Draggable>
            </View> : <User item={checkRole} />}
        </SafeAreaView>
    )
}