import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {TextInputMask} from 'react-native-masked-text'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [idade, setIdade] = useState('')

    function handleData() {
        if(name === '' || email === '' || password === '' || cpf ==='' || idade === '') {
            alert('Preencha todos os campos')
        }
    }

    return (
        <>
            <View style={styles.boxImage}>
                <Image source={require('../../img/logoSec.png')} />
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
                value={idade}
                onChangeText={idade => setIdade(idade)}
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
        width: '90%'
    },

    input: {
        borderBottomWidth: 1,
        height: 50,
        fontSize: 20,
        marginHorizontal: 5,
        marginBottom: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#329AF8',
        height: 40,
    },
    btnText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})
