import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState} from 'react';
export default function Login({navigation}) {
    const [name, setName] = useState("");
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.note} source={require('../img/note.png')}/>
            </View>
            <View style={styles.text}>
                <Text style={styles.txt1}>MANAGER YOUR</Text>
                <Text style={styles.txt2}>TASK</Text>
            </View>
            <View style={styles.input}>
                <Image style={styles.letter} source={require('../img/letter.png')}/>
                <TextInput style={styles.txtInput} placeholder="Enter your name" placeholderTextColor="gray"
                value={name} onChangeText={(userName) => setName(userName)}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity style={styles.btnLogin}
                onPress={() => navigation.navigate('List', {paramKey: name})}
                >
                    <Text style={styles.txtLogin}>GET STARTED</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex:3,
        alignItems: 'center',
        marginTop: 40,
    },
    note: {
        width: 250,
        height: 250,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 50,
    },
    txt1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#8353E2',
    },
    txt2: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#8353E2',
    },
    input: {
        flex: 1,
        marginBottom: 30,
    },
    letter: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 10,
        left: 30,
    },
    txtInput: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 50,
        marginLeft: 20,
        borderColor: 'gray',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    btnLogin: {
        width: 200,
        height: 50,
        backgroundColor: '#00BDD6',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtLogin: {
        fontSize: 20,
        color: 'white',
    },
});