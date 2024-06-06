import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserInfoCard = ({ title , value , sub }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.valueText}>{value + " " + sub}</Text>
        </View>
    );
};    

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 20,
        marginHorizontal: 5,
        borderRadius: 20,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    valueText: {
        fontSize: 16,
        color: '#555',
    },
  });   

export default UserInfoCard;