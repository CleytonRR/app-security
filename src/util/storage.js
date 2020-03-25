import {AsyncStorage} from 'react-native'

export async function addToken(token) {
    try {
        await AsyncStorage.setItem('@security:token', token)
    } catch (error) {
        throw error
    }
}

export async function getToken() {
    try {
        return AsyncStorage.getItem('@security:token')
    } catch (error) {
        throw error
    }
}

export async function deleteToken() {
    try {
        await AsyncStorage.removeItem('@security:token')
    } catch (error) {
        throw error
    }
}

export async function addId(id) {
    try {
        await AsyncStorage.setItem('@security:id', id)
    } catch (error) {
        throw error
    }
}

export async function getId() {
    try {
        return AsyncStorage.getItem('@security:id')
    } catch (error) {
        throw error
    }
}

export async function deleteId() {
    try {
        await AsyncStorage.removeItem('@security:id')
    } catch (error) {
        throw error
    }
}

