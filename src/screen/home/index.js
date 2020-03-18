import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import {Ionicons, FontAwesome} from '@expo/vector-icons'
import Constants from 'expo-constants';

const DATA = [
    {
        id: '1',
        title: 'First Item',
        description: 'Atacque',
        status: true
    },
    {
        id: '2',
        title: 'Second Item',
        description: 'Ataque de urso',
        status: false
    },
    {
        id: '3',
        title: 'Third Item',
        title: 'Ataque de tudo',
        status: false
    },
];

function Item({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.description}</Text>
            <Text styles={styles.title}>status: {
            item.status ?   <FontAwesome name="coffee" size={30} color={'white'} /> : 
            <Ionicons name="md-checkmark-circle" size={32} color="blue" />}
            </Text>
        </View>
    );
}

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
