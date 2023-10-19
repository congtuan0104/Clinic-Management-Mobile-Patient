import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { RootNativeStackParamList } from './types/types';
import { NativeBaseProvider } from 'native-base';
import {theme} from './theme'

const StackNavigator = () => {
  // Telling out navigator use it
  const RootStack = createNativeStackNavigator<RootNativeStackParamList>();
  return (
    <NativeBaseProvider theme={theme}>
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen  name="Login" component={LoginScreen} options={{headerShown:true}}/>
        <RootStack.Screen name="Register" component={RegisterScreen} options={{title:'Register'}}/>
      </RootStack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})