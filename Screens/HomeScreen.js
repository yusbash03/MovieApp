import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity, ScrollView } from 'react-native'
import {  SafeAreaView } from 'react-native-safe-area-context'
import {MagnifyingGlassIcon, Bars3CenterLeftIcon} from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar';
import { styles } from '../theme'
import TrendingMovies from '../Components/TrendingMovies';
import MovieList from '../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../API/moviedb';

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigation();

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getNowPlayingMovies();
        getPopularMovies();
    },[])

    const getTrendingMovies= async()=>{
        const data = await fetchTrendingMovies();
        //console.log("trending:", data);
        if(data && data.results){
            setTrending(data.results);
            setIsLoading(false);
        }
    }
    const getUpcomingMovies= async()=>{
        const data = await fetchUpcomingMovies();
        //console.log("trending:", data);
        if(data && data.results){
            setUpcoming(data.results);
            //setIsLoading(false);
        }
    }
    const getTopRatedMovies= async()=>{
        const data = await fetchTopRatedMovies();
        //console.log("trending:", data);
        if(data && data.results){
            setTopRated(data.results);
            //setIsLoading(false);
        }
    }
    const getNowPlayingMovies= async()=>{
        const data = await fetchNowPlayingMovies();
        //console.log("trending:", data);
        if(data && data.results){
            setNowPlaying(data.results);
            //setIsLoading(false);
        }
    }
    const getPopularMovies= async()=>{
        const data = await fetchPopularMovies();
        //console.log("trending:", data);
        if(data && data.results){
            setPopular(data.results);
            //setIsLoading(false);
        }
    }

 return (
    <View className="flex-1 bg-neutral-800">
        <SafeAreaView className={ios? 'mb-2' : 'mb3'}>
            <StatusBar className='text-neutral-200' />
            <View className='flex-row justify-between items-center mx-4'>
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' />
                <Text className="text-white text-3xl font-bold">
                    <Text  style={{color:'red'}}>Cine</Text>Verse
                </Text>
                <TouchableOpacity onPress={()=> nav.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color='white' />
                </TouchableOpacity>
            </View>

            {
             isLoading ? (<Loading />) :
             (
                <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:20}}
    
                >
                    {/* trending movies */}
                    {trending.length > 0 && <TrendingMovies data={trending}/>}
                    {/* now playing movies */}
                    {nowPlaying.length > 0 && <MovieList title="Now Playing" data={nowPlaying}/>}
                    {/* now playing movies */}
                    {popular.length > 0 && <MovieList title="Popular" data={popular}/>}
                    
                    {/* upcoming movies */}
                    {upcoming.length > 0 && <MovieList title='Upcoming' data={upcoming} />}
    
                     {/* topRated movies */}
                     {topRated.length > 0 && <MovieList title='Top Rated' data={topRated} />}
                </ScrollView>
             )
            }
           
        </SafeAreaView>
    </View>

)
}

// const styles = StyleSheet.create({
//  container:{}
// })