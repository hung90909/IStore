import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { StyleSheet, View , FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_Product, API_DoanhThu } from '../../API/getAPI';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
export default function ThongKe() {

    const status = useIsFocused()
    const [doanhThu, setDoanhThu] = useState({})
    const [tongTien, setTongTien] = useState()
    const onDoanhThu = () => {
        fetch(API_DoanhThu + "/getDoanhThu")
            .then(item => item.json())
            .then(item => setDoanhThu(item))
            .catch(err => console.log(err))

    }
    const onTongDoanhThu =() =>{
        fetch(API_DoanhThu + "/getTongDoanhthu")
        .then(item => item.json())
        .then(item => setTongTien(item))
        .catch(err => console.log(err))
    }

 
    useEffect(() => {
        onDoanhThu()
        onTongDoanhThu()
    }, [status])

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.month}>{`Tháng ${item.thang}`}</Text>
            <Text style={styles.revenue}>{`${item.doanhThu.toLocaleString('vi-VN')}`}$</Text>
        </View>
    );

    const data = Object.entries(doanhThu).map(([thang, doanhThu]) => ({
        thang,
        doanhThu,
    }));

    return (
        <SafeAreaView style={{
            padding: 20
        }}>
            <Text style={{
                fontSize: 24, fontWeight: "bold", alignSelf: "center"
            }}>Thống kê doanh thu</Text>
            <View style={{
                backgroundColor: "white", minHeight: 100, width: "100%", marginTop: 30,
                borderRadius: 20, paddingHorizontal: 20
            }}>
                <Text style={{
                    fontSize: 20, marginTop: 10
                }}>
                    Tổng doanh thu
                </Text>
                <Text style={{
                    fontSize: 23, fontWeight: "bold", marginTop: 10
                }}>{tongTien}$</Text>
            </View>
            <View style={{
                  backgroundColor: "white",  marginTop: 20, 
                  borderRadius: 20, paddingHorizontal: 20,
                  minHeight:150
            }}>
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.thang}
                />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    month: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    revenue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
    },
  });