import React from 'react'
import {View,Text,Modal,StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native'

const ModalPopup=props=>{
    return(
        <Modal 
            animationType="slide"
            transparent={true}
            visible={props.visible}
             >
                <View style={{flex: 1,
                 justifyContent: "center",
                 alignItems: "center",
                 marginTop: 22}} >
                 <View style={styles.model} >
                 <View style={{margin:10,width:120,height:120,borderRadius:50}} >
                    <Image source={{uri:'https://i.pinimg.com/originals/06/ae/07/06ae072fb343a704ee80c2c55d2da80a.gif'}} style={{width:'100%',height:'100%'}} />
                </View>
                 <Text style={{fontFamily:'medium',fontSize:18,color:'black'}} >{props.type=='Dish'?'Dish Uploaded Successfully':props.type=='Orders'?"Your Orders has been created":'Category Added Successfully'}</Text>
                 {props.type=='Orders'?<Text style={{textAlign:'center',margin:5,color:'black',fontFamily:'medium',fontSize:15}} >Order id :{props.taskid}</Text>:null}
                 {props.type=='Orders'?
                 <TouchableOpacity onPress={()=>{props.visibility(false)}} style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('screen').width*0.9,height:50,margin:10,backgroundColor:'green',borderRadius:20,alignSelf:'center'}}  >
                     <Text style={{color:'white',textAlign:'center',fontSize:16,fontFamily:'book'}} >Back To Order List</Text>
                 </TouchableOpacity>
                 :
                 <TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={{justifyContent:'center',alignItems:'center',width:Dimensions.get('screen').width*0.9,height:50,margin:10,backgroundColor:'green',borderRadius:20,alignSelf:'center'}}  >
                     <Text style={{color:'white',textAlign:'center',fontSize:16,fontFamily:'book'}} >Back To Dish List</Text>
                 </TouchableOpacity>}
                 </View>
                </View>
            </Modal>
    )

}

const styles=StyleSheet.create({
    model:{
        borderRadius:20,
        width:Dimensions.get('screen').width*0.95,
        backgroundColor:'#ffffff',
        margin:10,
        borderWidth:2,
        borderColor:'#ffde17',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
})

export default ModalPopup;