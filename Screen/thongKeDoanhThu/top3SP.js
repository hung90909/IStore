import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_Product, API_DoanhThu } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const Top3SP = () => {

    const nav = useNavigation()
    const [listTopSP, setListTopSP] = useState([])
    const [listUnderSP, setListUnderSP] = useState([])
    const getAllTopSP = () => {
        fetch(API_Product + "/getTopSP")
            .then(item => item.json())
            .then(item => setListTopSP(item))
            .catch(err => console.log(err))
    }
    const getAllUnderSP = () => {
        fetch(API_Product + "/getUnderSP")
            .then(item => item.json())
            .then(item => setListUnderSP(item))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllTopSP()
        getAllUnderSP()
    }, [])

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        } else {
            return num;
        }
    }
    const sortedProducts = listTopSP.sort((a, b) => b.sold - a.sold);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top 3 Sản phẩm</Text>
            <View style={styles.stepsContainer}>
                {sortedProducts.slice(0, 3).map((product, index) => (
                    <View
                        key={product.id}
                        style={[
                            styles.step,
                            index === 0 && styles.top1Step,
                            index === 1 && styles.top2Step,
                            index === 2 && styles.top3Step,
                        ]}
                    >
                        <View style={styles.stepContent}>
                            <Image source={{uri:product.image}} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productRank}>#Top {index + 1}</Text>
                                <Text style={styles.productName}>{product.name_product}</Text>
                                <Text style={styles.productSales}>{formatNumber(product.sold)} đơn hàng</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        alignSelf:"center",
        marginTop:30, 
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    step: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    top1Step: {
        marginBottom: 0,
    },
    top2Step: {
        marginBottom: -32,
    },
    top3Step: {
        marginBottom: -64,
    },
    stepContent: {
        alignItems: 'center',
    },
    productImage: {
        width: "100%",
        height: 100,
        borderRadius: 5,
        marginBottom: 16,
    },
    productRank: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: "center"
    },
    productName: {
        fontSize: 13,
        marginTop:10,
        marginBottom: 4,
        color: 'green',
        fontWeight:"bold",
        
    },
    productSales: {
        fontSize: 12,
        color: '#888',
        marginTop:5
    },
});

export default Top3SP;
