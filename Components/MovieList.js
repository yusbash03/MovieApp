import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { defaultImage, image185, image342 } from '../API/moviedb';

var{width, height} = Dimensions.get('window');

export default function MovieList({title, data, hideSeeAll}) {
    const navigation = useNavigation();
    // const handleClick =()=>{
    //     navigation.navigate('Movie', item);
    // }
    let movieName = "Ant-Man and the wasp: Quantumania"
 return (
 <View className='mb-10 space-y-4'>
    <View className='flex-row mx-4 justify-between items-center'>
    <Text className='text-xl text-white'>{title}</Text>
    
    {!hideSeeAll && 
    <TouchableOpacity onPress={()=> Alert.alert('Messsage', 'Sorry, not yet avaible')}>
         <Text style={styles.text} className='text-lg'>See All</Text>
    </TouchableOpacity>
   
    }
    
    </View>
    <ScrollView
    horizontal
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:15}}
    >
        {
            data.map((item, index)=>{
                return (
                    <TouchableWithoutFeedback onPress={()=> navigation.push('Movie', item)} key={index}>
                        <View className='space-y-1 mr-4'>
                        <Image 
                        source={{uri: image185(item.poster_path) || defaultImage}}
                        style={{width:width*.33, height:height*0.22}}
                        className='rounded-3xl'/>
                        <Text className='text-neutral-300 ml-1 text-center'>
                            {item.title.length >14 ? item.title.slice(0,14)+'...': item.title}
                            </Text>
                        </View>
                        
                    </TouchableWithoutFeedback>
                )
            })
        }
    </ScrollView>
 </View>
)
}

