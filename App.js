import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './src/screen/signup/index'
import Signin from './src/screen/singin/index'
import Home from './src/screen/home/index'
import CreateCall from './src/screen/createCall/index'
import MapCalls from './src/screen/mapCalls'
import FinishCall from './src/screen/finishCall/index'
import Loading from './src/screen/loadPage/index'

import {getId} from './src/util/storage'

const Stack = createStackNavigator()

export default function App() {
  const [login, setLogin] = useState('')

  useEffect(() => {
    async function loadToken() {
      try {
        var id = await getId()
        if (parseInt(id) === 1) {
          return setLogin(1)
        }

        if (parseInt(id) === 0) {
          return setLogin(0)
        }

        return setLogin(null)
      } catch (error) {
        alert('Erro intenro')
      }
    }

    loadToken()
  }, [])

  if(login === '') {
    return <Loading />
  }

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
              options={{
                title: 'Chamadas em aberto'
              }}
            >
              {props => <MapCalls {...props} setId={setLogin} />}
            </Stack.Screen>
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
              options={{
                title: 'Cadastrar novo usuário'
              }}
            >
              {props => <Signup {...props} setId={setLogin} />}
            </Stack.Screen>
          </>
        ) : (
            <>
              <Stack.Screen
                name='home'
                options={{
                  title: 'Suas chamadas'
                }}
              >
                {props => <Home {...props} setId={setLogin} />}
              </Stack.Screen>
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

