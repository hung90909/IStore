import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_Clothes } from "../../API/getAPI"
import { useIsFocused } from '@react-navigation/native';
import CustomAlert from '../../componet/customAlert';
import GridView from './GridView';
import Draggable from 'react-native-draggable';
import { useNavigation } from '@react-navigation/native';
import { API_TypeClothes } from '../../API/getAPI';
import { Modal } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
export default function typeProduct() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectItem, setSelectItem] = useState()
    const status = useIsFocused()
    const nav = useNavigation()
    const [data, setData] = useState([])
    const [cont , setCont] = useState(0)
    const getAPI = () => {
        fetch(API_TypeClothes + "/getAllTypeProduct")
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getAPI()
    }, [status , cont])

    const onDelete = (id) => {
        fetch(API_TypeClothes + "/deleteTypeProduct" +"/"+ id)
            .then(() =>  getAPI())
            .catch(err => console.error(err))
    }
    function OptionModal({ selectItem }) {
        const [modalSelectItem, setModalSelectItem] = useState(null);
        useEffect(() => {
            setModalSelectItem(selectItem);
        }, [selectItem]);
        if (!modalSelectItem) {
            return null;
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>{modalSelectItem.product_type}</Text>
                            <Image style={{
                                width: 80, height: 80, borderRadius: 40, borderColor: "black",
                                borderWidth: 1
                            }} source={{ uri: modalSelectItem.image }} />
                            <View style={styles.optionContainer}>
                                <TouchableOpacity
                                    style={[styles.optionButton, styles.cancelButton]}
                                    onPress={() => {
                                        onDelete(modalSelectItem._id)
                                        setModalVisible(!modalVisible)
                                    }
                                    }
                                >
                                    <Text style={styles.textOption}>Xoá</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.optionButton, styles.confirmButton]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        nav.navigate("editTypeProduct",{modalSelectItem})
                                     }}
                                >
                                    <Text style={styles.textOption}>Sửa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <GridView
                            setOption={() => {
                                setModalVisible(true)
                                setSelectItem(item)
                            }}
                            item={item}
                        />
                    )
                }}
            />
            <OptionModal selectItem={selectItem} />
            <Draggable
                x={350}
                y={540}
                z={1}
                reverse={false}
            >
                <TouchableOpacity
                    onPress={() => {
                        nav.navigate("addTypeProduct")
                    }}>
                    <Image style={{
                        width: 50, height: 50, borderRadius: 20,
                        right: 0, position: "absolute", bottom: 10
                    }} source={require("../../assets/addProduct.png")} />
                </TouchableOpacity>
            </Draggable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 200,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    optionButton: {
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 6,
        elevation: 2,
        // width: '50%',
        alignItems: "center",
        justifyContent: "space-between"
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    confirmButton: {
        backgroundColor: '#337ab7',
    },
    textOption: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign:"center"
    },
});
