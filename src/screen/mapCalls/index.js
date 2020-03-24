import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'

import api from '../../service/api'

export default function MapCalls({ navigation }) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYXN0ZXJQb2xpY3lAZ21haWwuY29tIiwiaWF0IjoxNTg1MDE0Mzg3LCJleHAiOjE1ODUwMTc5ODd9.tcOEx0kmyg0H-VyF9rJTpdflR39upz00dKjPGvR9fYU"

    const [currentRegion, setCurrentRegion] = useState(null)
    const [calls, setCalls] = useState(null)

    async function loadPosition() {
        const { granted } = await requestPermissionsAsync()

        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true
            })

            const { latitude, longitude } = coords
            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
        }
    }

    async function loadCalls() {
        try {
            const response = await api.get('/calls', {
                headers: { Authorization: "Bearer " + token }
            })
            alert('tudo okay')
            var teste = response.data[0]
            console.log(teste.local.coordinates[0])
            setCalls(response.data)
        } catch (error) {
            console.log(error)
            alert('Deu algum error')
        }
    }

    useEffect(() => {
        loadPosition()
        loadCalls()
    }, [])

    if (!currentRegion || !calls) {
        return null
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            {calls.map(item => (
                <Marker key={item.id} coordinate={{ latitude: item.local.coordinates[0], longitude: item.local.coordinates[1] }}>
                    <FontAwesome name='eye' size={32} color='red' />
                    <Callout
                        onPress={() => navigation.navigate('finishCall', {
                            id: item.id,
                            title: item.title,
                            description: item.description
                        })}
                    >
                        <View style={styles.callout}>
                            <Text style={styles.name}>Cleyton Rodridues Furtado</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
            {/* <Marker coordinate={{ latitude: -3.4634184, longitude: -41.5550501 }}>
                <FontAwesome name='eye' size={32} color='red' />
                <Callout 
                onPress={() => navigation.navigate('finishCall', {
                id: 1, 
                name: 'Cleyton Rodrigues Furtado', 
                title: 'Estou sendo atacado', 
                description: 'Tem bandidos na minha casa'}) }>
                    
                </Callout>
            </Marker> */}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    callout: {
        width: 260
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16
    },

    title: {
        fontSize: 13,
        color: '#642BD9'
    },

    description: {
        fontSize: 10
    }
})