import React from 'react'
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native'

export default function Signup() {
    return (
        <>
            <View style={styles.boxImage}>
                <Image source={require('../../img/logoSec.png')} />
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Nome' />

                <TextInput style={styles.input} placeholder='Email' />

                <TextInput style={styles.input} placeholder='Senha' />

                <TextInput style={styles.input} placeholder='CPF' />

                <TextInput style={styles.input} placeholder='Idade' />

                <Button title='Criar novo usuário' />
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
    }
})
