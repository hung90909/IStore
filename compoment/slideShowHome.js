import React, { Component } from 'react';
import { View, Text , Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default function SlideShow(){

    return(
        <Swiper autoplay={true} autoplayTimeout={1}>
        <View style={{flex:1 ,}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg"}}/>
        </View>
        <View style={{flex:1 , backgroundColor:"yellow"}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J1FlEWKqAGimsFc1ckrkIkvG7GFwPaA6gA&usqp=CAU"}}/>
        </View>
        <View style={{flex:1 , backgroundColor:"black"}}>
        <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oHFMV_PambyUHDBqIFKmBRuGUKthOYfG5Q&usqp=CAU"}}/>
        </View>
      </Swiper>
    )
}