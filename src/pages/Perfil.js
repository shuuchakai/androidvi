import React, {useRef, useState} from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import UserInfoCard from '../components/UserInfoCard';
import UserCard from '../components/UserCard';
const user = {
    user_id: '123456',
    username: 'John Doe',
    avatar: require('../assets/user.png'),
    age: 30,
    weight: 75,
    height: 180,
    biologicalSex: 'Male',
    gender: 'Male',
    exerciseFrequency: '3 times a week',
    allergy: ['Peanuts', 'Shellfish'],
    disease: ['Hypertension'],
    medication: ['Aspirin'],
    sleepHours: 7,
    occupation: 'Software Developer',
    goals: ['Lose weight', 'Build muscle'],
  };

const Perfil = () => {
    const navigation = useNavigation();
    return (
      <View>
      <View style={styles.profileTop}>
        <ImageBackground
          source={require('../assets/background.jpg')}
        >
        <View style={{ flexDirection: 'row' , justifyContent: 'center', alignItems: 'center', margin: 20}}>
        <Image
          source={user.avatar}
          style={{ width: 100, height: 100, borderRadius: 50, marginRight: 10}}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white'}}>{user.username}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20, marginHorizontal: 5}}>
          <UserInfoCard title="Edad" value={user.age} sub="años" />
          <UserInfoCard title="Peso" value={user.weight} sub="kg"/>
          <UserInfoCard title="Altura" value={user.height}  sub="m"/>
        </View>
      </ImageBackground>
      </View>
      <UserCard user={user} />
    </View>
    )
}

const styles = StyleSheet.create({
  profileTop: {
  },
});

export default Perfil;