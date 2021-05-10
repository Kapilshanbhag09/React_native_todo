import React,{useState,useEffect} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
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
                console.log(res.data.length);
                settasklist(res.data);
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })

        });
    }, [])
  AsyncStorage.getItem('login_username').then((e)=>setlogin_username(e));
    return (
        
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
            <SafeAreaView>
                <Text style={{color:'white',textAlign:'right',fontSize:40}}>
                    {

                    }
                </Text>
            </SafeAreaView>
            <View>
                <Text style={{color:"white",textAlign:'center',fontSize:50}}>Your List</Text>
            </View>
            <ScrollView style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:30}}>
            {
                tasklist.map((task)=>{
                    return(
                        <TouchableOpacity style={styles.task_view} onPress={()=>navigation.navigate('Task')}>
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
        paddingLeft:10
    },
    task_view_title:{
        color:"white",
        fontSize:30
    }
})
