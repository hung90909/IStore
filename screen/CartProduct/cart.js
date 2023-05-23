import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    SafeAreaView, FlatList, ToastAndroid , 
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { API_Buyer, API_TypeProduct, API_Product, API_Address, API_Cart } from '../../API/getAPI';
import icon from '../../compoment/icon'


export default function Cart() {
    const [data, setData] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (item) => {
        if (selectedItems.includes(item)) {
          // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
          setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
          // Nếu sản phẩm chưa được chọn, thêm vào danh sách
          setSelectedItems([...selectedItems, item]);
        }
      };

    const onGetAllCart = () => {
        fetch(API_Cart + '/getAllCart')
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        onGetAllCart()
    }, [])
    return (
        <View style={{
            flex: 1, backgroundColor: "#DCDCDC"
        }}>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: "100%", padding: 15,  flexDirection: "row" }}>
                            <CheckBox value={selectedItems.includes(item)}
                             onValueChange={() => handleCheckboxChange(item)}/>
                            <Image style={{
                                width: 80, height: 80
                            }} source={{ uri: item.image }} />
                            <View style={{marginLeft:15}}>
                                <Text style={{
                                     fontWeight:'bold',  fontSize: 18,
                                }}>{item.name_product}</Text>
                                <Text style={{marginTop:5}}>Phân loại: Áo mùa hè</Text>
                                <Text style={{marginTop:5 , color: "red"}}>{item.price}$</Text>
                            </View>
                        </View>
                    )

                }}
            />
        </View>

    )
}