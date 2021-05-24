import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../source/screen/WelcomeScreen';
import React, { useState, useEffect } from 'react';
import CreationScreen from '../source/screen/CreationScreen';
import SettingCuisine from '../source/screen/SettingCuisine';
const AuthStack = createStackNavigator();

const MyAuth =()=> {
  return (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Creation" component={CreationScreen} />
    <AuthStack.Screen name="CuinsineSetting" component={SettingCuisine} />
    </AuthStack.Navigator>
  );
}

const FlowStack = createStackNavigator()
const AppNav = () => {

    return(
        <NavigationContainer>
            <FlowStack.Navigator screenOptions={{headerShown:false}}>
            <FlowStack.Screen name='Welcome' component={MyAuth}  />
            </FlowStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNav