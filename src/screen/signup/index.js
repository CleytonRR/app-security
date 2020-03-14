import React from 'react'
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function Signup() {
    return (
        <>
            <View style={styles.boxImage}>
                <Image source={require('../../img/logoSec.png')} />
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholderTextColor="#3C3CF0" placeholder='Nome' />

                <TextInput style={styles.input} placeholderTextColor="#3C3CF0" placeholder='Email' />

                <TextInput style={styles.input} placeholderTextColor="#3C3CF0" secureTextEntry={true} placeholder='Senha' />

                <TextInput style={styles.input} placeholderTextColor="#3C3CF0" placeholder='CPF' />

                <TextInput style={styles.input} placeholderTextColor="#3C3CF0" placeholder='Idade' />

                <TouchableOpacity style={styles.btn} onPress={()=>{}}>
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
