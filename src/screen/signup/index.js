import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import api from '../../service/api'
import Loading from '../loadPage/index'

import { addToken, addId } from '../../util/storage'

export default function Signup({setId}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [age, setAge] = useState('')
    const [master, setMaster] = useState(false)
    const [load, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleData() {
        if (error !== null) {
            setError(null)
        }
        if (name === '' || email === '' || password === '' || cpf === '' || age === '') {
            return alert('Preencha todos os campos')
        }
        setLoading(true)

        try {
            await api.post('/user', { name, email, password, cpf, age, master })
            const response = await api.post('/login', {
                email,
                password
            })
            await addToken(response.data.token)
            await addId('0')
            setLoading(false)
            setId(0)
        } catch (error) {
            setLoading(false)
            if(error.response === undefined) {
                return setError('Erro interno')
            }
            return setError(error.response.data.message)
        }

    }
    
    if(load) {
        return <Loading />
    }

    return (
        <>
            <View style={styles.boxImage}>
                <Image source={require('../../img/logoSec.png')} />
                {error !== null ? <Text style={styles.textError}>{error}</Text> : null}
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#3C3CF0"
                    placeholder='Nome'
                    value={name}
                    onChangeText={name => setName(name)}
                />

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#3C3CF0"
                    keyboardType='email-address'
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                />

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#3C3CF0"
                    secureTextEntry={true}
                    placeholder='Senha'
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Text style={styles.txtSmall}>A senha deve ter no mínimo 8 caracteres, uma letra maiscula, um número e um caracter especial</Text>

                <TextInputMask
                    style={styles.input}
                    placeholder='CPF'
                    placeholderTextColor="#3C3CF0"
                    type={'cpf'}
                    value={cpf}
                    onChangeText={cpf => setCpf(cpf)}
                />

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#3C3CF0"
                    placeholder='Idade'
                    keyboardType='numeric'
                    value={age}
                    onChangeText={age => setAge(age)}
                />

                <TouchableOpacity style={styles.btn} onPress={handleData}>
                    <Text style={styles.btnText}>Adicionar usuário</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

    boxImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        flex: 2,
        width: '100%',
        paddingHorizontal: 20
    },

    load: {
        marginTop: 50
    },

    input: {
        borderBottomWidth: 1,
        height: 50,
        fontSize: 20,
        marginHorizontal: 5,
        marginBottom: 10
    },

    txtSmall: {
        fontSize: 12,
        fontWeight: 'bold',
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

    textError: {
        fontSize: 18,
        color: '#FF00FF',
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 5
    }
})
