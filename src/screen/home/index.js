import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons, } from '@expo/vector-icons'
import api from '../../service/api'

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlclNpbXBsZUBnbWFpbC5jb20iLCJpYXQiOjE1ODQ4MjQzNzIsImV4cCI6MTU4NDgyNzk3Mn0.HMWRdHPfVWM1oYwJE6N7EUPv0bVsEZQTYyg7ChCCW6I'

function Item({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text styles={styles.status}>status: {
                item.status ? <Ionicons name="md-clock" size={28} color='blue' /> :
                    <Ionicons name="md-checkmark-circle" size={28} color="green" />}
            </Text>
        </View>
    );
}

export default function Home({ navigation }) {
    const [data, setDate] = useState(null)

    useEffect(() => {
        const load = navigation.addListener('focus', async () => {
            try {
                const response = await api.get('/calls', {
                    headers: {Authorization: "Bearer " + token}
                })
                setDate(response.data)
            } catch (error) {
                alert('Deu algum erro')
            }
        }
    )
    return load
    }, [navigation])
    return (
        <>
        <SafeAreaView style={styles.container}>

        {data == null ? (
            <Text style={styles.textNotFound}>Nenhuma ocorrência. Para adicionar toque no botão abaixo</Text>
        ) : (
            <>
            <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id}
            style={styles.lista}
            />
             </>
        )}
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('newCall')}>
                <Ionicons name="md-add-circle" size={50} color='#642db9' />
             </TouchableOpacity>
        </SafeAreaView>
        </>
    )
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

    textNotFound: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0e0e0e'
    },

    title: {
        fontSize: 32,
    },

    description: {
        fontSize: 18,
    },

    btn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        marginBottom: 10,
    }
});
