import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import CustomInput from './CustomInput';
import LoadingScreen from './LoadingScreen';
import CustomButton from './CustomButton';

import { API_URL } from '../utils/constants';

import schema from '../utils/schemas/signin.schema'

function SigninCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: null, password: null });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (isSubmitting) {
            const loginUser = async () => {
                try {
                    const response = await axios.post(API_URL + '/users/login', { email, password });
            
                    const ifUser = await AsyncStorage.getItem('user');
            
                    if (ifUser) {
                        await AsyncStorage.removeItem('user');
                    }
            
                    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
            
                    navigation.navigate('HomePage');
                } catch (error) {
                    console.error(error);
                    if (error.response && error.response.data && error.response.data.message) {
                        const errorMessage = error.response.data.message;
                        if (errorMessage === 'Usuario no encontrado') {
                            setError({ email: errorMessage });
                        } else if (errorMessage === 'Contraseña incorrecta') {
                            setError({ password: errorMessage });
                        } else {
                            setError({ api: errorMessage });
                        }
                    } else {
                        setError({ api: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' });
                    }
                }
                setIsSubmitting(false); // Reset the submitting state
            };

            loginUser();
        }
    }, [isSubmitting]);

    if (isSubmitting) {
        return <LoadingScreen />;
      }

    const validateForm = async () => {
        const fields = { email, password };
        let errors = {};

        for (const field in fields) {
            try {
                await schema.validateAt(field, { [field]: fields[field] });
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    errors[field] = error.message;
                }
            }
        }

        setError(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm();
    };

    return (
        <View>
            <CustomInput
                    label="Usuario" 
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Introduce tu correo electrónico"
                    error={error.email}
                />
                <CustomInput
                    label="Contraseña"
                    value={password}
                    placeholder="Introduce tu contraseña"
                    onChangeText={setPassword}
                    error={error.password}
                    secure={true}
                />
              <CustomButton onPress={handleSubmit} title="Iniciar sesión" />
 
              {/* <VerifyEmailModal isVisible={showModal} onClose={() => { setShowModal(false)}} navigator={() => handleLogin()} /> */}

              <View style={{ marginTop: 20}}>
                <Text style={{color: '#0077b6', fontSize: 15}}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://files.catbox.moe/kbyku5.mp4')}}>
                  <Text style={{color: '#560bad', fontSize: 15}}>Visita Nuestro Sitio Web Para Crear Una</Text>
                </TouchableOpacity>  
              </View>
              <View style={{ marginTop: 20, flexDirection: 'row'}}>
                <Text style={{color: '#0077b6', fontSize: 15}}>¿Ocurrio un error? </Text>
                <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://files.catbox.moe/kbyku5.mp4')}}>
                  <Text style={{color: '#560bad', fontSize: 15}}>Contactanos</Text>
                </TouchableOpacity>  
              </View>
        </View>
    )
}

export default SigninCard;