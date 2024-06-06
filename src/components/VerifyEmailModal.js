import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import CustomButton from './CustomButton';

const VerifyEmailModal = ({ isVisible, onClose , navigator }) => {

    const [inputValues, setInputValues] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, inputValues.length);
    }, [inputValues]);
    
    const handleChange = (index) => (text) => {
        if (text.length > 1) {
            return; // Ignora la entrada si tiene más de un dígito
        }

        const newInputValues = [...inputValues];
        newInputValues[index] = text;
        setInputValues(newInputValues);

        if (text.length >= 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Verifica tu correo electrónico</Text>
                    <Text style={styles.subtitle}>Hemos enviado un código de 6 dígitos a tu correo. Ingrésalo debajo.</Text>
                    <View style={styles.inputGroup}>
                        {inputValues.map((value, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                value={value}
                                onChangeText={handleChange(index)}
                                ref={ref => inputRefs.current[index] = ref}
                                maxLength={1}
                                keyboardType="numeric"
                            />
                        ))}
                    </View>
                    <CustomButton onPress={navigator} title="Confirmar" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default VerifyEmailModal;
