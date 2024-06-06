import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PhotoCard from '../components/PhotoCard';

const FoodPhoto = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <PhotoCard />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: '#fff',
    },
});

export default FoodPhoto;