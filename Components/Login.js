import React from 'react'
import { View, Text,StyleSheet,Dimensions, TextInput,Image, SafeAreaView } from 'react-native'

export default function Login() {
    return (
        <View>

            <View style={styles.upper_design}>{/*Upper Design */}
                <View style={styles.upper_design_circle_1}>
                <View style={styles.upper_design_circle_2}>

                    </View>

                </View>
               
                <SafeAreaView>
                <Image style={styles.todo_image_logo}source={require('../assets/todo_home_icon.png')}/>
                </SafeAreaView>
            </View>
            <View style={styles.login_view}>{/*Login View */}
                <View>
                   <Text>Username</Text>
                </View>
                <View>
                    <TextInput/>
                </View>
                <View>
                    <Text>Password</Text>
                </View>
                <View>
                    <TextInput/>
                </View>
            </View>
          
        </View>
    )
}
const styles = StyleSheet.create({
    upper_design:{
        height:Dimensions.get('window').width/2,
        backgroundColor:"#FF003E",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    upper_design_circle_1:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width,
        backgroundColor:"white",
        borderRadius:Dimensions.get('window').width/2,
        marginLeft:-Dimensions.get('window').width/2,
        marginTop:-Dimensions.get('window').width/2,

    },
    upper_design_circle_2:{
        width:Dimensions.get('window').width-6,
        height:Dimensions.get('window').width-6,
        backgroundColor:"#FF1950",
        borderRadius:Dimensions.get('window').width/2,

    },
    todo_image_logo:{
        marginRight:15,
        resizeMode:'contain',
        height:'80%',
        },  

    login_view:{
        height:Dimensions.get('window').height,
        //-Dimensions.get('window').width/2,
        backgroundColor:"#FF003E",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center',
        //-Dimensions.get('window').width/2,
    },


    
});
