import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

export default function FinishCall({ route, navigation }) {
    const { id, name, title, description } = route.params

    async function finish() {
        alert('Parabéns, mais uma chamada finalizada')
        navigation.goBack()
    }
    return (
        <>
            <View style={styles.boxImage} >
                <Image source={require('../../img/logoSec.png')} />
            </View>
            <View style={styles.container}>

                <Text style={[styles.text, styles.name]}>{name}</Text>
                <Text style={[styles.text, styles.title]}>{title}</Text>
                <Text style={[styles.text, styles.description]}>{description}</Text>
                <TouchableOpacity style={styles.btn} onPress={finish}>
                    <Text style={styles.btnText}>Finalizar</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 2,
        paddingHorizontal: 10
    },

    text: {
        color: '#3C3CF0',
        textAlign: 'center'
    },

    name: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    title: {
        fontSize: 20
    },

    description: {
        fontSize: 15
    },

    btn: {
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#642db9',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 10,
        marginTop: 10
    },

    btnText: {
        fontSize: 20,
        color: '#fff'
    }
})