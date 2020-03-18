import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './src/screen/signup/index'
import Signin from './src/screen/singin/index'
import Home from './src/screen/home/index'

const Stack = createStackNavigator()

export default function App() {
  const [login, setLogin] = useState(1)
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2b62d9' 
        },
        headerTintColor: '#fff'
      }}
      >
        {login == null ? (
          <>
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
          </>
        ): (
          <Stack.Screen
          name='home'
          component={Home}
          options={{
            title: 'Chamadas realizadas'
          }}
          />
        ) 
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

