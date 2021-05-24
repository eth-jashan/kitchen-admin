import React, { useState, useEffect } from 'react';

//-----Redux Setup--------//
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import ReduxThunk from 'redux-thunk'

//importing reducer
import ProfileReducer from './store/reducer/profile'

//-----initialising reducer---//
const rootReducer = combineReducers({
  profile:ProfileReducer  
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

//----Importing Navigator-----//


//-----Custom Font Setup-------//
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading"
import AppNav from './navigator/AppNav';

const fontLoading = () =>{ 
  return Font.loadAsync({
    
    'black':require('./android/app/src/main/assets/fonts/AirbnbCereal-Black.ttf'),
    'bold':require('./android/app/src/main/assets/fonts/AirbnbCereal-Bold.ttf'),
    'book':require('./android/app/src/main/assets/fonts/AirbnbCereal-Book.ttf'),
    'extraBold':require('./android/app/src/main/assets/fonts/AirbnbCereal-ExtraBold.ttf'),
    'light':require('./android/app/src/main/assets/fonts/AirbnbCereal-Light.ttf'),
    'medium':require('./android/app/src/main/assets/fonts/AirbnbCereal-Medium.ttf'),
    'logo': require('./android/app/src/main/assets/fonts/Cocon-Regular-Font.otf')
})}
//---------------------------------------//



export default function App({navigation}){

const[fontLoad, setFontLoad] = useState(false)

  if(!fontLoad)
      {
        return <AppLoading
        startAsync ={fontLoading}
        onFinish = {() => setFontLoad(true)}
        onError = {(test)=> console.log(test) }
        /> 
      }

  return<Provider store={store}><AppNav/></Provider>

}


