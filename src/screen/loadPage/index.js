import React from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native'
import loadAnimation from '../../../assets/loadAnimation.json'

export default function Loading() {
    return (
        <SafeAreaView style={styles.container}>
            <LottieView 
            resizeMode='contain'
            autoSize
            source={loadAnimation} 
            autoPlay 
            loop 
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})