import React, { useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'

export default function CreateCall({ navigation }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {

    })

    async function createCall() {
        alert('Criei')
        navigation.goBack()
    }

    return (
        <>
            <View style={styles.boxLogo}>
                <Image source={require('../../img/logoSec.png')} />
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder='Título'
                    placeholderTextColor="#3C3CF0"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Descrição'
                    placeholderTextColor="#3C3CF0"
                    value={description}
                    onChangeText={(description) => setDescription(description)}
                    style={styles.input}
                />

                <TouchableOpacity style={styles.btn} onPress={createCall}>
                    <Text style={styles.btnText}>Criar nova ocorrência</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxLogo: {
        flex: 1,
        alignItems: 'center',
    },

    form: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 10
    },

    input: {
        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 30,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },

    btn: {
        borderWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        backgroundColor: '#642db9',
        borderRadius: 10
    },

    btnText: {
        fontSize: 16,
        color: '#FFF'
    }
})