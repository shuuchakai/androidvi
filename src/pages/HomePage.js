import React, {useRef, useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

import PageTitle from '../components/PageTitle';
import UserProfileCard from '../components/UserProfileCard';
import WeightLogCard from '../components/WeightLogCard';

import { API_URL } from '../utils/constants';
    
const user = {
    username: 'EjemploUsuario',
    avatar: require('../assets/user.png'),
    additionalInfo: 'Información adicional del usuario'
};

const weightData = [
    { date: 'May 01', weight: 70 },
    { date: 'May 08', weight: 69.5 },
    { date: 'May 15', weight: 69 },
    { date: 'May 22', weight: 68.5 },
    { date: 'May 23', weight: 68 },
    { date: 'May 24', weight: 70 },
    { date: 'May 25', weight: 69.66 }
];

const HomePage = ()  =>{

    const navigation = useNavigation();

    return (
        <View style={{flex: 1,justifyContent: 'space-between', margin : 10}}>
            <PageTitle title="¡Bienvenido a Vitatri!"/>
            <View style={{flex: 2.5, maxHeight: '90%'}}><UserProfileCard user={user}/></View>
            <View style={{flex: 5.5, marginTop: 20}}><WeightLogCard weightData={weightData} /></View>
        </View>
    )
}  

export default HomePage;
