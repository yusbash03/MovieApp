import React, { useCallback, useState } from 'react'
import { View, Dimensions, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import MovieList from '../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { fetchSearchedMovies, image185 } from '../API/moviedb';
import _ from 'lodash'


var{width, height} = Dimensions.get('window');
export default function Search() {
    const [movieResult, setMovieResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigation();
    const handleSearch = (value)=>{
        if(value &&value.length > 1){
            setIsLoading(true);
            fetchSearchedMovies({
                query:value,
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data=>{
                //console.log('data', data)
                setMovieResult(data.results);
                setIsLoading(false);
            })
        }
        else{
            setIsLoading(false);
            setMovieResult([]);
        }
        //console.log('val', value);
    }
    const handleTextDebounce = useCallback(_.debounce(handleSearch, 400), []);
    let movieName = "Ant-Man and the wasp: Quantumania"
 return (
 <SafeAreaView className='bg-neutral-800 flex-1'>
    <View className='flex-row justify-between mb-6 mx-4 mt-4 items-center
            border border-neutral-500 rounded-full'>
            <TextInput 
            onChangeText={handleTextDebounce}
            placeholder='Search show'
            placeholderTextColor='gray'
            className='text-white font-semibold pb-1 pl-6 flex-1 text-base tracking-wider' />
            <TouchableOpacity onPress={()=> nav.navigate('Home')} className='p-3 m-1 bg-neutral-500 rounded-full'>
                <XMarkIcon size={30} color='white' />
            </TouchableOpacity>
    </View>
    {
        isLoading ?(<Loading/>):
        movieResult.length > 0 ? 
    ( <ScrollView
        className='space-y-3'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}>
            <Text className='text-white font-semibold ml-1'>Results: {movieResult.length}</Text>
    
            <View className='flex-wrap justify-between flex-row'>
                {movieResult.map((item, index)=>{
                    return(
                        <TouchableWithoutFeedback onPress={()=> nav.push('Movie', item)} key={index}>
                            <View className='space-y-2 mb-4'>
                            <Image 
                                source={{uri: image185(item.poster_path)}}
                                width={width*0.44}
                                height={height*0.4}
                                className='rounded-3xl'/>
                                <Text className='text-neutral-300 ml-2 text-center'>{item.title.length >20 ? item.title.slice(0,20)+'...': item.title}</Text>
                            </View>
                             
                        </TouchableWithoutFeedback>
                    )
                })}
            </View>
        </ScrollView>)
     : 
     (<View className='flexe-row justify-center'>
     <Image source={require('../assets/movietime1.png')} className='h-96 w-96'/>
     </View>)
    }
   
   

    
 </SafeAreaView>
)
}

