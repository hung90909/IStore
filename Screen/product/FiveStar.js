import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
// import { icon } from "../../conten"


export default function FiveStar(props) {
    const {numberStar} = props;
   return(
     [0,1,2,3,4].map((item)=>{
        return(
            <Image
            style={{width:10, height:10,
            tintColor:item <= numberStar -1 ? '#ffce3d' : 'gray'}}
            source={require("../../assets/star.png")}/>
        )
     })
   )

}