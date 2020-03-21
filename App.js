import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './src/screen/signup/index'
import Signin from './src/screen/singin/index'
import Home from './src/screen/home/index'
import CreateCall from './src/screen/createCall/index'
import MapCalls from './src/screen/mapCalls'
import FinishCall from './src/screen/finishCall/index'

const Stack = createStackNavigator()

export default function App() {
  const [login, setLogin] = useState(null)

  useEffect(() => {
    async function loadToken() {
      try {
        var id = await AsyncStorage.getItem('id')
        if (parseInt(id) === 1) {
          return setLogin(1)
        }

        if (parseInt(id) === 0) {
          return setLogin(0)
        }
      } catch (error) {
        alert('Erro intenro')
      }
    }

    loadToken()
  }, [])

  if (login === 1) {
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
          <>
            <Stack.Screen
              name='mapsCall'
              component={MapCalls}
              options={{
                title: 'Chamadas em aberto'
              }}
            />
            <Stack.Screen
              name='finishCall'
              component={FinishCall}
              options={{
                title: 'Encerrar chamada'
              }}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

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
              options={{
                title: 'Logar'
              }}
            >
              {props => <Signin {...props} setId={setLogin}
              />}
            </Stack.Screen>
            <Stack.Screen
              name='signup'
              component={Signup}
              options={{
                title: 'Cadastrar novo usuário'
              }}
            />
          </>
        ) : (
            <>
              <Stack.Screen
                name='home'
                component={Home}
                options={{
                  title: 'Suas chamadas'
                }}
              />
              <Stack.Screen
                name='newCall'
                component={CreateCall}
                options={{
                  title: 'Criar nova chamada'
                }}
              />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

