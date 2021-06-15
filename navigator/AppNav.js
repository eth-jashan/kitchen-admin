import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../source/screen/WelcomeScreen';
import React, { useState, useEffect } from 'react';
import CreationScreen from '../source/screen/CreationScreen';
import SettingCuisine from '../source/screen/SettingCuisine';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../source/screen/HomeScreen';
import ProfileScreen from '../source/screen/ProfileScreen';
import { Entypo, Feather  } from '@expo/vector-icons';
import {View} from 'react-native'
import OtpScreen from '../source/screen/OtpScreen';
import KycScreen from '../source/screen/kycScreen';
import DishUploadScreen from '../source/screen/DishUploadScreen';
import BannerUploadScreen from '../source/screen/BannerUploadScreen';
import CategoryUpload from '../source/screen/CategoryUpload';
import DishListScreen from '../source/screen/DishListScreen';
import CategoryListScreen from '../source/screen/CategoryListScreen';


const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator initialRouteName={"Welcome"} screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Creation" component={CreationScreen} />
    <AuthStack.Screen name="CuinsineSetting" component={SettingCuisine} />
    <AuthStack.Screen name="Otp" component={OtpScreen} />
    </AuthStack.Navigator>
  );
}

const HomeStack = createStackNavigator();



const Tab = createMaterialBottomTabNavigator()

const BottomStack = () => {
    
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#08818a"
          barStyle={{ backgroundColor: 'white' }}
          shifting={true}
          screenOptions={{headerShown:false}}

        >
          <Tab.Screen
            
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Entypo name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
              <View>                
                <Feather  name="list" size={24} color={color}/>
              </View>
              ),
            }}
          />
        </Tab.Navigator>)

}

const MainStack = createStackNavigator();

const MainComp = () => {

  return(
    <MainStack.Navigator screenOptions={{headerShown:false}}>
      <MainStack.Screen name='Home' component={BottomStack} />
      <MainStack.Screen name='Kyc' component={KycScreen} />
      <MainStack.Screen name='DishListScreen' component={DishListScreen} />
      <MainStack.Screen name='CategoryListScreen' component={CategoryListScreen}/>
      <MainStack.Screen name="DishUpload" component={DishUploadScreen}/>
      <MainStack.Screen name="MenuCreation" component = {CategoryUpload}/>
      <MainStack.Screen name="BannerUpload" component = {BannerUploadScreen}/>
    </MainStack.Navigator>
  )

} 


const FlowStack = createStackNavigator()
const AppNav = () => {

    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            {/* <FlowStack.Screen name='Auth' component={MyAuth}  /> */}
            <FlowStack.Screen name='Main' component={MainComp}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav