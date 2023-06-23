import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import CustomAlert from '../../componet/customAlert';
import FiveStar from './FiveStar';
import  { useState, useEffect } from 'react';
import { API_Product } from '../../API/getAPI';
export default function GridView(props) {
    const [alertVisible, setAlertVisible] = useState(false);
    // const [listSP , setListSP] = useState([])
    // const [soLuong , setSoLuong] = useState()
    const { item, onDelete, onDetail , soLuongSP } = props;
    const handleDeleteUser = () => {
        setAlertVisible(true);
    };

    const handleCancelPressed = () => {
        setAlertVisible(false);
    };

    // const getSP = () => {
    //    fetch(API_Product + '/getAllProducts')
    //    .then(item => item.json())
    //    .then(item => setListSP(item))
    //    .catch(err => console.log(err))
    // }
    // const getSoluongSP = () =>{
    //    const soLuong =   listSP.map(item => item.soLuongSP)
    //    setSoLuong(soLuong)
    // }

    // useEffect(() => {
    //     getSP()
    // },[])
    // const {url , name , price , isChecked , star , reviews , description} = props.item;
    return (
        <TouchableOpacity
            onPress={onDetail}
            style={{
                alignSelf: "center", justifyContent: "center"
                , width: "40%", marginHorizontal: 10
            }}>
            <View style={{
                width: 160,
                margin: 10,
                borderRadius: 14,
                borderWidth: 1,
            }}>
                <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                    <Image
                        resizeMode='cover'
                        style={{
                            width: 80, height: 100, marginVertical: 5,
                            borderRadius: 15
                        }}
                        source={{
                            uri: item.image,
                        }} />
                    <TouchableOpacity
                        onPress={()=>handleDeleteUser()}
                    >
                        <Image style={{
                            width: 30, height: 30, position: 'absolute', right: -65, top: 10
                        }} source={require("../../assets/delete.png")} />
                    </TouchableOpacity>
                </View>
                <Text style={{
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "red",
                }}>{item.name_product}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{
                    marginHorizontal: 5,
                    fontSize: 10
                }}>- {item.description}</Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{
                        marginLeft: 15,
                        flex: 1,
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center" }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                            }}>${item.price}</Text>
                            <View style={{
                                flexDirection: "row", margin: 10, justifyContent: "center",
                            }}>
                                <FiveStar numberStar={item.review} />
                            </View>
                        </View>
                       {item.sold ?<Text style={{
                            right: 10,
                            fontSize: 10, position: "absolute", bottom: 20
                        }}>Đã bán: {item.sold}</Text> : <Text style={{
                            right: 10,
                            fontSize: 10, position: "absolute", bottom: 20
                        }}>Đã bán: 0</Text> }

                    </View>
                </View>
               {soLuongSP <= 0 && <View style={{
                    position:"absolute", top:60,
                    height:40, width:"100%", backgroundColor:"black", borderWidth:2,
                    borderColor:"white", justifyContent:"center", alignItems:"center"
                }}>
                    <Text style={{
                        color:"white", fontWeight:"bold"
                    }}>Đã hết hàng </Text>
                </View> }
            </View>
            <CustomAlert
                visible={alertVisible}
                title="Thông báo"
                message="Bạn có chắn chẵn muốn xóa không ?"
                onCancelPressed={handleCancelPressed}
                onOkPressed={() => {
                    onDelete(item._id)
                    setAlertVisible(false);
                }}
            />
        </TouchableOpacity>
    )

}