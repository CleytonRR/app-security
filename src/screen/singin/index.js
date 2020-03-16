import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import api from '../../service/api'

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleDatas() {
        if(email === '' || password === '') {
            return alert('Preencha todos os campos')
        }
        try {
            const response = await api.post('/login', {
                email,
                password
            })
            alert('Success')
            console.log(response.data.token)
        } catch (error) {
            if(error.response) {
                alert('Errro')
                console.log(error.response.status)
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