import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, } from '@expo/vector-icons'

const DATA = [
    {
        id: '1',
        title: 'Bandido na minha casa',
        description: 'Entrou um bandido agora na minha casa e ele ta quebrando tudo, venham logo!!!',
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
        title: 'Third',
        description: 'Ataque de tudo',
        status: false
    },

    {
        id: '4',
        title: 'Third',
        description: 'Ataque de tudo',
        status: false
    },

    {
        id: '5',
        title: 'Third',
        description: 'Ataque de tudo',
        status: false
    },
    {
        id: '6',
        title: 'Third',
        description: 'Ataque de tudo',
        status: false
    },
    {
        id: '7',
        title: 'Third',
        description: 'Ataque de tudo',
        status: false
    },
];

function Item({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text styles={styles.status}>status: {
                item.status ? <Ionicons name="md-checkmark-circle" size={28} color={'green'} /> :
                    <Ionicons name="md-clock" size={28} color="blue" />}
            </Text>
        </View>
    );
}

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('newCall')}>
                <Ionicons name="md-add-circle" size={50} color='#642db9' />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#642BD9'
    },
    title: {
        fontSize: 32,
    },

    description: {
        fontSize: 18,
    },

    btn: {
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        marginBottom: 10
    }
});
