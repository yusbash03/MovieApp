import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { defaultImage, image500 } from '../API/moviedb';


var{width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick =(item)=>{
        navigation.navigate('Movie', item);
    }
 return (
 <View className='mb-10'>
    <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
    <Carousel
        data={data}
        renderItem={({item}) => 
        <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.65}
        slideStyle={{display:'flex', alignItems:'center'}}
     />
 </View>
)
}
const MovieCard=({item, handleClick})=> {
    //console.log('poster', item.poster_path)
 return (
<TouchableWithoutFeedback onPress={()=> handleClick(item)}>
    <Image 
    source={{uri: image500(item.poster_path) || defaultImage}}
    //source={require('../assets/avengers.jpeg')}
    width={width*0.6}
    height={height*0.4}
    className='rounded-3xl'/>
</TouchableWithoutFeedback>
)
}

