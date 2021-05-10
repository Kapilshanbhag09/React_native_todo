import React,{useState,useEffect} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
export default function Home({navigation}) {
    const [login_username,setlogin_username]=useState('')
    const[listobj,setlistobj]=useState({})
    const[listfound,setlistfound]=useState(false)
    const[tasklist,settasklist]=useState({})
    useEffect(() => {
        AsyncStorage.getItem('login_username').then((e)=>{
            axios.get('http://3629ed50c494.ngrok.io/listfetch/'+e)
            .then(function(res) {
                if(res.data!="No List found"){
                settasklist(res.data)
                setlistfound(true)
                }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }, [])
    const logout_pressed=()=>{
        AsyncStorage.setItem('login_username','',()=>{
            AsyncStorage.setItem('login_password','',()=>{
                navigation.goBack()
            })
        })
    }
  AsyncStorage.getItem('login_username').then((e)=>setlogin_username(e));
    return (
        
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
            <SafeAreaView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View>
                    <Text style={{color:'white',textAlign:'left',fontSize:40,marginLeft:10}}>
                    Hello!
                </Text>
                    </View>
                    <TouchableOpacity style={{marginRight:10}} onPress={logout_pressed}>
                    <Image source={require('../assets/logout.png')} style={{width:45, resizeMode:'contain', marginLeft:50}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <View>
                <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your List</Text>
            </View>
            <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:30}}>
            {
                listfound==false?
                <Text>Not found</Text>
                :
                tasklist.map((task)=>{
                    return(
                        <TouchableOpacity style={styles.task_view} onPress={()=>navigation.navigate('Task',{taskname:task})}>
                             <Text style={styles.task_view_title}>{task}</Text>
                        </TouchableOpacity>
                    )
                    
                }
                )
            
            }
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
    task_view:{
        backgroundColor:"#FF003E",
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        borderRadius:10,
    },
    task_view_title:{
        color:"white",
        fontSize:30
    }
})
