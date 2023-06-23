import React, { Component } from 'react';
import { View, Text , Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default function SlideShow(){

    return(
        <Swiper autoplay={true} autoplayTimeout={1}>
        <View style={{flex:1 ,}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://www.airlinkcommunication.com/media/wysiwyg/Banners/Website-Banner-ip-12.png"}}/>
        </View>
        <View style={{flex:1 , backgroundColor:"yellow"}}>
         <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://blog.daraz.lk/wp-content/uploads/2020/11/Apple-iPhone-12-Banner.png"}}/>
        </View>
        <View style={{flex:1 , backgroundColor:"black"}}>
        <Image style={{width:"100%" , height:"100%"}} source={{uri:"https://dailytimes.com.pk/assets/uploads/2020/12/11/website-banner-1200x4181-1.png"}}/>
        </View>
      </Swiper>
    )
}