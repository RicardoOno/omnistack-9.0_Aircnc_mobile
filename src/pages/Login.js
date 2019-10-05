import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                console.log(`[mobile | Login] user: ${user}`);
                api.post('/sessions', {
                    email: 'nothing' 
                })
                navigation.navigate('List');
            }
        })
    }, [])

    async function handleSubmit(){
        //email e techs
        const response = await api.post('/sessions', {
            email
        });
        console.log(`[Login] response: ${response.data}`);
        const { _id } = response.data;
       
        console.log(`[Login] id: ${_id}`);
       
        await AsyncStorage.setItem('user', _id); 
        await AsyncStorage.setItem('techs', techs);

        console.log(_id);
        navigation.navigate('List'); 
    }
    
    return (
        <KeyboardAvoidingView   behavior="padding" style={styles.container}>
            <Image source={logo} />
            
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail *</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={text => setEmail(text)}  />
                
                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Tecnologias utilizadas"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={techs => setTechs(techs)}   />

                <TouchableOpacity onPress={handleSubmit} style={styles.button} >
                    <Text style={styles.buttonText}>Login </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //alinha na vertical
        alignItems: 'center', //alinha na vertical
        paddingTop: Platform.OS === 'android' ? 25 : 0  
    },

    from: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})