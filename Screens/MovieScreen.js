import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Platform, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import { styles, themes } from '../theme'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../Components/Cast'
import MovieList from '../Components/MovieList'
import Loading from './Loading'
import { defaultImage, fetchMovieCredit, fetchMovieDetail, fetchSimilarMovies, image500 } from '../API/moviedb'

var{width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios?'':' mt-3';
let movieName = "Ant-Man and the wasp: Quantumania"
export default function MovieScreen() {
   const {params:item} = useRoute()
   const [cast, setCast] = useState([]);
   const [similarMovies, setSimilarMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [movieDetail, setMovieDetail] = useState({});

   const nav = useNavigation();
   const [isFavorite, toggleFavorite] = useState(false);
   useEffect(()=>{
      //console.log('movie', item.id)
      setIsLoading(true);
      getMovieDetail(item.id)
      getMovieCredits(item.id)
      getSimilarMovies(item.id)
      //setIsLoading(false);
   },[item]);

   const getMovieDetail= async(id)=>{
      const data = await fetchMovieDetail(id);
      //console.log("trending:", data);
      if(data && data){
         //console.log('data', data.title)
          setMovieDetail(data);
          setIsLoading(false);
      }
   }
   const getMovieCredits= async(id)=>{
      const data = await fetchMovieCredit(id);
      if(data && data.cast){
          setCast(data.cast);
          //setIsLoading(false);
      }
   }
   const getSimilarMovies= async(id)=>{
      const data = await fetchSimilarMovies(id);
      //console.log("sim:", data.results);
      if(data && data.results){
          setSimilarMovies(data.results);
          //setIsLoading(false);
      }
   }
 return (
 <ScrollView contentContainerStyle={{paddingBottom:20}} className='flex-1 bg-neutral-600'>
   <View className='w-full'>
      <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-start px-4'+topMargin}>
         <TouchableOpacity onPress={()=> nav.goBack()} style={styles.background} className='rounded-xl p-1'>
            <ChevronLeftIcon size={30} strokeWidth={2.5} color='white' />
         </TouchableOpacity>
         <TouchableOpacity onPress={()=> toggleFavorite(!isFavorite)}>
            <HeartIcon size={35} color={isFavorite?themes.background : 'white'} />
         </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? 
         (<Loading/>):
         (<View>
            <Image 
          source={{uri: image500(movieDetail?.poster_path) || defaultImage}}
          style={{width, height:height*0.55}}
          />
          <LinearGradient
          style={{width, height:height*0.55}}
          colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
          start={{x:0.5, y:0}}
          end={{x:0.5, y:1}}
          className='absolute bottom-0'
          />
            </View>)
      }  
      

      {/* movies detals */}
      <View style={{height: -(height*0.09)}} className='space-y-3'>
         <Text className='font-bold text-center text-white text-3xl tracking-wider'>
            {movieDetail?.title}</Text>
            {movieDetail.id ? ( <Text className='font-semibold text-center text-neutral-400 text-base'>
         {movieDetail?.status} - {movieDetail?.release_date.split('-')[0]} - {movieDetail?.runtime} mins
            </Text>) : null}
        
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{justifyContent:"center"}}>
      <View className='flex-row justify-center mx-4 space-x-2'>
         {
            movieDetail?.genres && movieDetail?.genres.map((genre, index)=>{
               let showDash = index+1 != movieDetail.genres.length;
               return(
                  <Text key={index} className='font-semibold text-center text-neutral-400 text-base'>
                  {genre?.name}{showDash ? ' -' : null}
            </Text>
               )
            })
         }
      </View>
      </ScrollView>
   
      {/* description */}
      <Text className='tracking-wide text-neutral-400 mx-4'>
         {movieDetail?.overview}
      </Text>
   </View>
   {/* cast */}
   {cast.length > 0 &&<Cast cast={cast} nav={nav} />}
   {/* similar movies */}
   {similarMovies.length > 0 && <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />}
 </ScrollView>
)
}

