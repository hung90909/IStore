import React, { Component } from 'react';
import { View, Text , Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default function SlideShow(){

    return(
        <Swiper 
        showsPagination={false}
        autoplay={true} autoplayTimeout={1}>
        <View style={{flex:1 ,}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILBgc0doROSuUo7HYi6iU0ZH4xoDMRaruOQ&usqp=CAU"}}/>
        </View>
        <View style={{flex:1 ,}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLYGpA7sv3agLfuHIpOEpPlsKI__3QtCDuHA&usqp=CAU"}}/>
        </View>
        <View style={{flex:1 , }}>
        <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcPOZWB_4d3CtxsQHQQsdiga4nfnq7iNd_A&usqp=CAU"}}/>
        </View>
      </Swiper>
    )
}