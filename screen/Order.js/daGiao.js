import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    SafeAreaView, FlatList, Alert, Modal, Button
} from 'react-native';
import { API_Buyer, API_DetailOrder, API_Product } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

export default function DaGiao() {
    const nav = useNavigation()
    const [list, setList] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [id, setID] = useState('')
    const trangThai = useIsFocused()

    const [rating, setRating] = useState(0);


    const getProduct = () => {
        fetch(API_Product + "/getAllProducts")
            .then(item => item.json())
            .then(item => setListProduct(item))
            .catch(err => console.log(err))
    }

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
          return 0; // Trường hợp không có đánh giá nào, trả về giá trị 0
        }
      
        const totalRating = reviews.reduce((sum, rating) => sum + rating.review, 0);
        const averageRating = Math.min( totalRating / reviews.length,5);
        const starRating = Math.round(averageRating); // Làm tròn giá trị trung bình
      
        return starRating;
      };

    const handleRatingSubmit = (rating, orderID , ID_Product) => {
        fetch(API_DetailOrder + "/updateReview/" + orderID, {
            method: "PUT",
            body: JSON.stringify({ review: rating }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => console.log(err))


        fetch(API_DetailOrder + "/getReviews/" + ID_Product)
        .then(response => response.json())
        .then(reviews => {

            // console.log(reviews)
          // Tính toán đánh giá trung bình từ các đánh giá đã lưu
          // Lưu đánh giá trung bình vào trường review của bảng product
          const averageRating = calculateAverageRating(reviews);
          fetch(API_Product + "/updateProductReview/" + ID_Product, {
            method: "PUT",
            body: JSON.stringify({ review: averageRating }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));


        const updateList = list.map(item => {
            if (item._id === orderID) {
                return { ...item, review: rating }
            }
            return item
        })
        setList(updateList)
    };

    const handleSelectedStar = (rating, orderID , ID_Product) => {
        handleRatingSubmit(rating, orderID ,ID_Product );
        setRating(rating);
    };

    const getAllDaGiao = async () => {
        const user = await AsyncStorage.getItem('data');
        const data = user ? JSON.parse(user) : null;

        fetch(API_DetailOrder + "/getAllOrderDaNhan", {
            method: "POST",
            body: JSON.stringify({ id: data._id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(item => item.json())
            .then(data => setList(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllDaGiao()
        getProduct()
    }, [trangThai])


    return (
        <View style={{ flex: 1, backgroundColor: "#DCDCDC" }}>
            <FlatList
                data={list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: "100%", backgroundColor: "white", height: 190,
                            padding: 10, marginTop: 10
                        }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image style={{
                                    width: 80, height: 80
                                }} source={{ uri: item.image }} />
                                <Text style={{ marginLeft: 12, fontSize: 20, fontWeight: "bold" }}>{item.nameSP}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between", flex: 1,
                                marginTop: 7
                            }}>
                                <Text>{item.soluongSP} sản phẩm</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 20 }}>Thành tiền: </Text>
                                    <Text style={{ fontSize: 20, color: "red" }}>{item.tongTien}$</Text>
                                </View>

                            </View>
                            <View style={{ position: "absolute", right: 10, top: 37, }}>
                                <Text style={{ fontSize: 16, marginLeft: 30 }}>x{item.soluongSP}</Text>
                                <Text style={{ color: "red", fontSize: 20 }}>{item.giaSP}$</Text>
                            </View>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Text style={{ color: "green" }}>Đã giao hàng thành công</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={item.review}
                                    starSize={20}
                                    starStyle={{ color: "orange" }}
                                    selectedStar={(rating) => handleSelectedStar(rating, item._id , item.ID_Product)}
                                />

                            </View>

                        </View>
                    )
                }}
            />




        </View>
    )
}