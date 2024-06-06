import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../utils/supabase';
import { decode } from 'base64-arraybuffer'

import CustomButton from './CustomButton';
import PageTitle from './PageTitle';

const url = "ULR FROM SUPABASE";

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
  const [modalVisible, setModalVisible] = useState(false);

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
        setImage(result.assets[0].uri);;
        setBase64(result.assets[0].base64);
    }
   
  };


  const uploadImage = async (base64) => {
    try {
      setLoading(true);
      const fileName = `${Math.random().toString(36).substring(7)}_${Date.now()}.png`;  
      console.log(fileName);
      const { data, error } = await storage
      .from('vitatri-images-food')
      .upload("iaImages/" +fileName, decode(base64), {
        contentType: 'image/png'
      })
      if (error) {
        Alert.alert('Error', 'No se pudo subir la imagen');
        console.error(error);
      } else {
        console.log('Imagen subida:', data.path); 
        setPath(data.path);
        const imageUrl = url + data.path;
        console.log(imageUrl);
        await sendImageUrlToServer(imageUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir la imagen');
      console.error(error);
    }finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  const sendImageUrlToServer = async (imageUrl) => {
    try {
      const response = await fetch('http://192.168.1.13:4000/analizar-imagen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      
      setNombre(data.nombre);
      setCalorias(data.calorias);
      setCarbohidratos(data.carbohidratos);
      setGrasas(data.grasas);
      setProteinas(data.proteinas);

    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la imagen al servidor');
      console.error(error);
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
        <Image source={{ uri: image}} style={styles.image} />
        {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 16 }} />}
        {!loading && (
          <CustomButton title="Analizar Imagen" onPress={() => uploadImage(base64)}/>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.additionalContainerStyles]}>
            <Text style={[styles.title, styles.titleText]}>{nombre}</Text>
            <Text style={styles.infoText}>Por cada 100 gramos</Text>
            <Text style={styles.infoText}>Calorías: {calorias} Kcal</Text>
            <Text style={styles.infoText}>Carbohidratos: {carbohidratos} g</Text>
            <Text style={styles.infoText}>Grasas: {grasas} g</Text>
            <Text style={styles.infoText}>Proteínas: {proteinas} g</Text>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
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
