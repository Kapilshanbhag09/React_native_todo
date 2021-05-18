import React,{useState,useEffect} from 'react'
import { StyleSheet,View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Image, Modal, TextInput,Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
export default function Home({navigation}) {
    const [login_username,setlogin_username]=useState('')
    const[listobj,setlistobj]=useState({})
    const[listfound,setlistfound]=useState(false)
    const[tasklist,settasklist]=useState({})
    const[isaddModel,setisaddModel]=useState(false)
    const[newlistname,setnewlistname]=useState('')
    const[usehandler,setusehandler]=useState(false)
    useEffect(() => {
        AsyncStorage.getItem('login_username').then((e)=>{
            setlogin_username(e)
            axios.get('backend_url/listfetch/'+e)
            .then(function(res) {
                if(res.data!="No List found"){
                settasklist(res.data)
                setlistfound(true)
                }
            })
            .catch(function (error) {
              console.log("Error");
            })

        });
    }, [usehandler])
    const logout_pressed=()=>{
        AsyncStorage.setItem('login_username','',()=>{
            AsyncStorage.setItem('login_password','',()=>{
                navigation.goBack()
            })
        })
    }
    const delete_pressed=listname=>()=>{
        axios.get('backend_url/deletelist/'+login_username+'/'+listname)
            .then(function(res) {
                if(res.data=="Deleted"){
                    setusehandler(!usehandler)
                }
            })
            .catch(function (error) {
              console.log("There is an error");
            })
        
    }
    const add_list=()=>{
        axios.get('backend_url/addlist/'+login_username+'/'+newlistname)
            .then(function(res) {
                if(res.data=="Inserted"){
                   setusehandler(!usehandler);
                    setnewlistname('')
                    Alert.alert(
                        "Inserted !",
                        "New List has been inserted at the end",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log(''),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => setisaddModel(false) }
                        ]
                      );
                }
                
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            })
    }
    return (
        
        <View style={{backgroundColor:"#FF003E",height:Dimensions.get('window').height}}>
            <Modal transparent={true} visible={isaddModel}>
                <View style={{backgroundColor:"#000000aa",flex:1,flexDirection:'row',alignItems:'center'}}>
                    <View style={{backgroundColor:"#ffffff",flexDirection:'column',flex:1,marginLeft:50,marginRight:50}}>
                    <View>
                    <Text style={{color:"#FF003E",fontWeight:'bold',fontSize:30,marginLeft:40,marginBottom:10,marginTop:10,}}>Add List Name</Text>
               
               <TextInput style={{ borderBottomWidth:2,borderBottomColor:"#FF003E",height:30,fontSize:25,marginBottom:5,color:'#FF003E',marginLeft:20,marginRight:20}}
                  value={newlistname}
                  onChangeText={(t)=>setnewlistname(t)}
               />
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,borderRadius:100}}onPress={add_list}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#FF003E',margin:20,marginTop:0,borderRadius:100}}onPress={()=>setisaddModel(false)}>
                        <Text style={{color:"white",fontSize:30,textAlign:'center'}}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
            <ScrollView contentInset={{bottom: 60}}style={{backgroundColor:'white',height:"100%",borderTopLeftRadius:30,borderTopRightRadius:30,paddingTop:5}}>
            {
                listfound==false?
                <Text style={{textAlign:'center',marginTop:10,fontSize:20}}>Not found</Text>
                :
                tasklist.map((task)=>{
                    return(
                        <TouchableOpacity style={styles.task_view} onPress={()=>navigation.navigate('Task',{taskname:task})}>
                             <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                             <Text style={styles.task_view_title}>{task}</Text>
                            <TouchableOpacity style={{marginRight:10}} onPress={delete_pressed(task)}>
                            <Image source={require('../assets/delete.png')} style={{width:35, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                             </View>
                        </TouchableOpacity>
                    )
                    
                }
                )
            
            }
            </ScrollView>
            <TouchableOpacity style={{backgroundColor:"#FF003E",position:'absolute',bottom:0,right:0,width:75,height:75,flex:1,flexDirection:'row',alignItems:'center',borderTopLeftRadius:25}} onPress={()=>setisaddModel(true)}>
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
        paddingLeft:10,
        borderRadius:10,
    },
    task_view_title:{
        color:"white",
        fontSize:30
    }
})
