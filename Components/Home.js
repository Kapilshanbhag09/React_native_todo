import React,{useState} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home() {
    const [login_username,setlogin_username]=useState('')
  AsyncStorage.getItem('login_username').then((e)=>setlogin_username(e));
    return (
        
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
            <SafeAreaView>
                <Text style={{color:'white',textAlign:'right',fontSize:40}}>
                    Hello !
                </Text>
            </SafeAreaView>
            <View>
                <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your List</Text>
            </View>
            <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30}}>
            
            </ScrollView>
            <TouchableOpacity style={{backgroundColor:"#FF003E",position:'absolute',bottom:0,right:0,width:75,height:75,flex:1,flexDirection:'row',alignItems:'center',borderTopLeftRadius:25}}>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                <Text style={{fontSize:60,color:'white'}}>+</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({

})
