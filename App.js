import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './src/screen/signup/index'
import Signin from './src/screen/singin/index'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='signin'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2b62d9' 
        },
        headerTintColor: '#fff'
      }}
      >
        <Stack.Screen 
        name='signin' 
        component={Signin} 
        options={{
          title: 'Logar'
        }}
        />
        <Stack.Screen 
        name='signup' 
        component={Signup}
        options={{
          title: 'Cadastrar novo usuário'
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    height: 300,
    width: 300,
    borderWidth: 1,
    backgroundColor: 'black',

  }
});
