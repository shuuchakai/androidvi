import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ label, value, onChangeText, placeholder, error, secure }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 8,
    fontSize: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default CustomInput;