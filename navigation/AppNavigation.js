import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { View, StyleSheet } from 'react-native'
import HomeScreen from '../Screens/HomeScreen';
import MovieScreen from '../Screens/MovieScreen';
import PersonScreen from '../Screens/PersonScreen';
import Search from '../Screens/Search';


const stack = createNativeStackNavigator();
//console.log(stack);
export default function AppNavigation() {
 return (
    <NavigationContainer>
        <stack.Navigator>
            <stack.Screen name="Home" options={{headerShown:false}} component ={HomeScreen} />
            <stack.Screen name="Movie" options={{headerShown:false}} component ={MovieScreen} />
            <stack.Screen name="Person" options={{headerShown:false}} component ={PersonScreen} />
            <stack.Screen name="Search" options={{headerShown:false}} component ={Search} />
        </stack.Navigator>
    </NavigationContainer>
)
}

const styles = StyleSheet.create({
 container:{}
})