import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Sidebar from '../components/SideBar'

const Rutinas = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Rutinas</Text>
        </View>
    )
}

export default Rutinas;