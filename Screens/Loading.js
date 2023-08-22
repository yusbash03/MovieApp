import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'
import { themes } from '../theme';

var{width, height} = Dimensions.get('window');

export default function Loading() {
 return (
 <View style={{width, height}} className='flex-row absolute justify-center items-center'>
    <Progress.CircleSnail size={160} thickness={14} color={themes.background} />
</View>
)
}

// const styles = StyleSheet.create({
//  container:{
//     justifyContent:'center',
//     flex:1,
//     alignItems:'center'
//  }
// })