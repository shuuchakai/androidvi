import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <ScrollView>
      <Text style={styles.header}>Detalles del Usuario</Text>
      <Text style={styles.userDetailText}>{`Género: ${user.gender}`}</Text>
      <Text style={styles.userDetailText}>{`Frecuencia de ejercicio: ${user.exerciseFrequency}`}</Text>
      <Text style={styles.userDetailText}>{`Horas de sueño: ${user.sleepHours}`}</Text>
      <Text style={styles.userDetailText}>{`Alergias: ${user.allergy.join(', ')}`}</Text>
      <Text style={styles.userDetailText}>{`Enfermedades: ${user.disease.join(', ')}`}</Text>
      <Text style={styles.userDetailText}>{`Medicamentos: ${user.medication.join(', ')}`}</Text>
      <Text style={styles.userDetailText}>{`Metas: ${user.goals.join(', ')}`}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: '60%',
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  userDetailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
});

export default UserCard;