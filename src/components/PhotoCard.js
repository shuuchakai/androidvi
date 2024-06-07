import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../utils/supabase';
import { decode } from 'base64-arraybuffer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from './CustomButton';
import PageTitle from './PageTitle';
import { API_URL } from '../utils/constants';

const url = "";

const PhotoCard = () => {
  const [image, setImage] = useState(null);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState(null);
  const [nombre, setNombre] = useState('');
  const [calorias, setCalorias] = useState(0);
  const [carbohidratos, setCarbohidratos] = useState(0);
  const [grasas, setGrasas] = useState(0);
  const [proteinas, setProteinas] = useState(0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos para hacer esto funcionar.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(result.assets[0].base64);
    }
  };

  const uploadImage = async (base64) => {
    try {
      setLoading(true);
      const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.png`;
      const { data, error } = await storage
        .from('vitatri-images-food')
        .upload("iaImages/" + fileName, decode(base64), {
          contentType: 'image/png'
        });
      if (error) {
        Alert.alert('Error', 'No se pudo subir la imagen');
        console.error(error);
      } else {
        setPath(data.path);
        const imageUrl = url + data.path;
        await sendImageUrlToServer(imageUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir la imagen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendImageUrlToServer = async (imageUrl, path) => {
    try {
      const response = await fetch(API_URL + '/image/analizar-imagen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, path }), // Include the path here
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      setNombre(data.food.name);
      setCalorias(data.food.kcal);
      setCarbohidratos(data.food.carbs);
      setGrasas(data.food.fat);
      setProteinas(data.food.protein);
      setPath(data.path); // Set the path here

    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la imagen al servidor');
      console.error(error);
    }
  };


  const addToDailyCalories = async () => {
    try {
      const userId = JSON.parse(await AsyncStorage.getItem('user'));
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      await axios.post(API_URL + '/consumption/update', {
        user_id: userId.id,
        date: today,
        meal: 'Almuerzo', // Change this accordingly
        food: {
          id: Math.random().toString(36).substring(7),
          name: nombre,
          kcal: calorias,
          protein: proteinas,
          carbs: carbohidratos,
          fat: grasas,
        }
      });
    } catch (error) {
      console.error('Error updating food consumption:', error);
    }
  };

  return (
    <View style={styles.card}>
      <PageTitle title="Tomar una foto" />
      <CustomButton
        title="Abrir Camara"
        onPress={pickImage}
      />
      {image &&
        <>
          <Image source={{ uri: image }} style={styles.image} />
          {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 16 }} />}
          {!loading && (
            <>
              <CustomButton title="Analizar Imagen" onPress={() => uploadImage(base64)} />
              <View style={styles.nutritionInfo}>
                <Text style={styles.title}>{nombre}</Text>
                <Text style={styles.infoText}>Por cada 100 gramos</Text>
                <Text style={styles.infoText}>Calorías: {calorias} Kcal</Text>
                <Text style={styles.infoText}>Carbohidratos: {carbohidratos} g</Text>
                <Text style={styles.infoText}>Grasas: {grasas} g</Text>
                <Text style={styles.infoText}>Proteínas: {proteinas} g</Text>
              </View>
              <CustomButton title="Agregar a Calorías Diarias" onPress={addToDailyCalories} />
            </>
          )}
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  image: {
    marginTop: 16,
    width: 280,
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  nutritionInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
});

export default PhotoCard;
