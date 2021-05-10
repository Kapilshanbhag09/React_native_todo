import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Tasks from './Components/Tasks'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function App() {
  
  const [login_username,setlogin_username]=useState('')
  const[iniroute,setinitoute]=useState('');
  return (
   
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false,gestureEnabled:false}}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown:false,gestureEnabled:false}}
        />
        <Stack.Screen
          name="Task"
          component={Tasks}
          options={{headerShown:false}}
        />
        </Stack.Navigator>

      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
   
  },
});
