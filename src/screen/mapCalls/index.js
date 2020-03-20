import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'

export default function MapCalls({navigation}) {
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
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

        loadPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -3.4634184, longitude: -41.5550501 }}>
                <FontAwesome name='eye' size={32} color='red' />
                <Callout 
                onPress={() => navigation.navigate('finishCall', {
                id: 1, 
                name: 'Cleyton Rodrigues Furtado', 
                title: 'Estou sendo atacado', 
                description: 'Tem bandidos na minha casa'}) }>
                    
                    <View style={styles.callout}>
                        <Text style={styles.name}>Cleyton Rodridues Furtado</Text>
                        <Text style={styles.title}>Estou sendo atacada</Text>
                        <Text style={styles.description}>Tem bandidos na minha casa</Text>
                    </View>
                </Callout>
            </Marker>
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