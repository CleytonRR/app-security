import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import api from '../../service/api'

export default function SignUp({ setId, navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleDatas() {
        if(email === '' || password === '') {
            console.log(nomeUser)
            return alert('Preencha todos os campos')
        }
        try {
            const response = await api.post('/login', {
                email,
                password
            })
            await AsyncStorage.setItem('token', response.data.token)
            const master = response.data.master
            if(master) {
                await AsyncStorage.setItem('id', '1')
                setId(1)
            } else {
                await AsyncStorage.setItem('id', '0')
                setId(0)
            }
            alert('Success')
        } catch (error) {
            console.log(error)
            alert('Deu algum erro')
            if(error.response) {
                if(error.response.status === 401) {
                    alert('Email ou senha invalidos')
                }
            }
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.boxImg}>
                    <Image source={require('../../img/logoSec.png')} />
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor="#3C3CF0"
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                        placeholderTextColor="#3C3CF0"
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />
                    <TouchableOpacity style={styles.btn} onPress={handleDatas}>
                        <Text style={styles.btnText}>Logar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.btnTextNew}>Não tem conta? crie agora</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    boxImg: {
        flex: 1,
    },

    form: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    input: {
        borderBottomWidth: 1,
        height: 50,
        width: '100%',
        fontSize: 20,
        marginHorizontal: 5,
        marginBottom: 20
    },

    btn: {
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#642db9',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 10
    },

    btnText: {
        fontSize: 20,
        color: '#fff'
    },

    btnTextNew: {
        fontWeight: 'bold',
        fontSize: 15
    }
})