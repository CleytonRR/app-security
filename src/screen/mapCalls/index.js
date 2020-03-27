import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'

import api from '../../service/api'
import { getToken, deleteId, deleteToken } from '../../util/storage'

export default function MapCalls({ setId, navigation }) {

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
            var token = await getToken()
            const response = await api.get('/calls', {
                headers: { Authorization: "Bearer " + token }
            })
            setCalls(response.data)
        } catch (error) {
            if (error.response.status === 401) {
                await deleteId()
                await deleteToken()
                setId(null)
            }
        }
    }

    useEffect(() => {
        const load = navigation.addListener('focus', async () => {
            loadPosition()
            loadCalls()
        }
        )
        return load
    }, [navigation])

    if (!currentRegion || !calls) {
        return null
    }

    if (calls.length === 0) {
        return (
            <Text style={styles.textNotFound}>Nenhuma chamada em aberto</Text>
        )
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

    textNotFound: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0e0e0e'
    },

    title: {
        fontSize: 13,
        color: '#642BD9'
    },

    description: {
        fontSize: 10
    }
})