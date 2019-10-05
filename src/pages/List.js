import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import { Alert, SafeAreaView, ScrollView, Platform, AsyncStorage, Text, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';
import { withNavigation } from 'react-navigation';
import SpotList from '../components/SpotList';

export default function List(){
    
    const [techs, setTechs] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            
            const socket = socketio('http://192.168.43.145:3334', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                console.log('ooopa');
                Alert.alert(`
                Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? "Aprovada" : "Rejeitada"}
                `);
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArrays = storageTechs.split(',').map(t => t.trim());

            setTechs(techsArrays);
        })
    }, []);

    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <ScrollView >
                {techs.map(t => <SpotList key={t} tech={t}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0  
    },

    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})