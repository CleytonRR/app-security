import React, { useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import api from '../../service/api'

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlclNpbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE1ODQ4MjQzNzIsImV4cCI6MTU4NDgyNzk3Mn0.HMWRdHPfVWM1oYwJE6N7EUPv0bVsEZQTYyg7ChCCW6I'


export default function CreateCall({ navigation }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadPosition() {
            const { granted } = await requestPermissionsAsync() 
            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const {latitude, longitude} = coords
                setCurrentRegion({
                    latitude,
                    longitude,
                })
            }
        }
        loadPosition()
    }, [])

    async function createCall() {
        if(description === '' || title === '') {
            return alert('Preencha todos os campos')
        }
        try {
            await api.post('/newcall', {
                title,
                description,
                status: true,
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude
            }, {
                headers: {Authorization: "Bearer " + token}
            })
            navigation.goBack()
        } catch (error) {
            alert('deu ruim')
        }
        alert('Criei')
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