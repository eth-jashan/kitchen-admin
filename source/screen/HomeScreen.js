import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {View, Text, Image, Pressable, ScrollView, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeTab from '../component/homeTab'

const {width, height} = Dimensions.get('window')

const HomeScreen = ({navigation}) => {

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>

                <View style={{width:width*0.94, borderRadius:8, padding:12, height:height*0.25, alignSelf:'center', marginTop:10, alignItems:'center', justifyContent:'center'}}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#ffcb2a', '#ffa611']}
                    style={{position: 'absolute', left: 0, right: 0, top: 0, height:'100%', borderRadius:8}}
                />
                <Text style={{fontFamily:'medium', fontSize:20, alignSelf:'center', color:'brown'}}>Make Your Store Online</Text>
                <Text style={{fontFamily:'book', fontSize:18, alignSelf:'center', color:'white'}}>Complete the kyc process to go online</Text>

                <View style={{width:75, height:75, alignSelf:'center'}}>
                    <Image
                        source={require('../../android/app/src/main/assets/image/closed(1).png')}
                        style={{height:'100%', width:'100%'}}
                    />
                </View>
                </View>

                <HomeTab
                    index={0}
                    stext={'Create, Manage and Edit large categories with food'}
                    text={'Menu Creation'}
                />
                <HomeTab
                    index={1}
                    stext={'Upload the only the dishes without the menu structure'}
                    text={'Dish Uploads'}
                />
                <HomeTab
                    index={2}
                    stext={'Create Customisable offer banner to make your store attractive'}
                    text={'Banner Upload'}
                />
            </ScrollView>
        </SafeAreaView>
    )

}

export default HomeScreen