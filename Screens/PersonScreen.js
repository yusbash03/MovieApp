import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Platform, Dimensions, ScrollView, Image } from 'react-native'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { styles } from '../theme'
import MovieList from '../Components/MovieList';
import Loading from './Loading';
import { defaultImage, fetchMovieCredit, fetchPersonMovie, fetchPersonMovieCreditss, image342, image500 } from '../API/moviedb';

var{width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios?'':' my-3';

export default function PersonScreen() {
   const nav = useNavigation();
   const [isFavorite, toggleFavorite] = useState(false);
   const {params:item} = useRoute();
   const [person, setPerson] = useState({})
   const [movieCredits, setMovieCredits] = useState([])
   const [isLoading, setIsLoading] = useState(false);

   useEffect(()=>{
      setIsLoading(true);
      //console.log('person', item)
      getPerson(item.id)
      getMovieCredits(item.id)
      
   },[item]);

   const getPerson= async(id)=>{
      const data = await fetchPersonMovie(id);
      //console.log("dataq:", data);
      if(data && data){
          setPerson(data);
          setIsLoading(false);
      }
   }
   const getMovieCredits= async(id)=>{
      const data = await fetchPersonMovieCreditss(id);
      //console.log("data:", data);
      if(data && data.cast){
          setMovieCredits(data.cast);
          //setIsLoading(false);
      }
   }

 return (
         <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{paddingBottom:20}}>
            <SafeAreaView className={'z-20 w-full flex-row justify-between items-start px-4'+verticalMargin}>
               <TouchableOpacity onPress={()=> nav.goBack()} style={styles.background} className='rounded-xl p-1'>
                  <ChevronLeftIcon size={30} strokeWidth={2.5} color='white' />
               </TouchableOpacity>
               <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
                  <HeartIcon size={35} color={isFavorite?'tomato' : 'white'} />
               </TouchableOpacity>
            </SafeAreaView>

            {/* person detail */}
            {isLoading ? 
         (<Loading/>):
         (
            <View>
            <View className='justify-center flex-row' 
            style={{shadowRadius:40, shadowColor:'gray', shadowOpacity:1, shadowOffset:{width:0, height:5}}}>
            <View className='overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-500'>
               <Image 
               style={{height:height*0.43, width:width*0.74}}
                  source={{uri: image342(person?.profile_path) || defaultImage}}
               />
            </View>
            </View>
            <View className='mt-6'>
               <Text className='text-white text-3xl font-bold text-center'>{person?.name}</Text>
               <Text className='text-base text-neutral-500 text-center'>{person?.place_of_birth}</Text>
            </View>
            <View className='mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full'>
               <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                  <Text className='text-white font-semibold'>Gender</Text>
                  <Text className='text-neutral-300 text-sm'>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
               </View>
               <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                  <Text className='text-white font-semibold'>Birthday</Text>
                  <Text className='text-neutral-300 text-sm'>{person?.birthday}</Text>
               </View>
               <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                  <Text className='text-white font-semibold'>Known For</Text>
                  <Text className='text-neutral-300 text-sm'>{person?.known_for_department}</Text>
               </View>
               <View className='px-2 items-center'>
                  <Text className='text-white font-semibold'>Popularity</Text>
                  <Text className='text-neutral-300 text-sm'>{person?.popularity?.toFixed(2)}%</Text>
               </View>
              
            </View>
            <View className='my-6 mx-4 space-y-2'>
               <Text className='text-white text-lg'>Biographry</Text>
               <Text className='text-neutral-400 tracking-wide'>
               {person?.biography || 'Not available'}
               </Text>
            </View>
         <MovieList title="Movies" data={movieCredits} hideSeeAll={true} />
            </View>
         )
      }  
           
         </ScrollView>
)     
}

