import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { defaultImage, image185 } from '../API/moviedb';

export default function Cast({cast, nav}) {
    //const nav = useNavigation();
    let personName = "Henry Cavil"
    let characterName = "Clark Kent";

 return (
 <View className='my-6'>
    <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
    <ScrollView
    horizontal
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:15}}
    >
        {
            cast && cast?.map((person, index)=>{
                return (
                  <TouchableOpacity key={index} 
                  onPress={()=> nav.navigate('Person', person)}
                  className='mr-4 items-center'>
                    <View className='overflow-hidden rounded-full h-20 items-center border border-neutral-500'>
                    <Image 
                        source={{uri: image185(person?.profile_path) || defaultImage}}
                        className='rounded-2xl h-24 w-20'/>
                    </View>
                    <Text className='text-xs mt-1 text-white'>
                    {person?.character?.length >10 ? person?.character.slice(0,10)+'...': person?.character}
                    </Text>
                    <Text className='text-xs mt-1 text-neutral-400'>
                    {person?.original_name?.length >10 ? person?.original_name.slice(0,10)+'...': person?.original_name}
                    </Text>
                  </TouchableOpacity>
                )
            })
        }
    </ScrollView>
 </View>
)
}

