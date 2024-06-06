import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PageTitle = ({ title }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#48cae4',
    }
});

export default PageTitle;