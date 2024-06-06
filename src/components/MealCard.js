import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealCard = ({ mealType, foods, calories, macronutrients }) => {
  const { proteins, carbs, fats } = macronutrients;

  return (
    <View style={styles.card}>
      <Text style={styles.mealTypeText}>{mealType}</Text>
      <View style={styles.foodList}>
        {foods.map((food, index) => (
          <Text key={index} style={styles.foodText}>{food}</Text>
        ))}
      </View>
      <View style={styles.nutrientSection}>
        <Text style={styles.nutrientText}>{`Calorías totales: ${calories} cal`}</Text>
        <Text style={styles.nutrientText}>{`Proteínas: ${proteins}g`}</Text>
        <Text style={styles.nutrientText}>{`Carbohidratos: ${carbs}g`}</Text>
        <Text style={styles.nutrientText}>{`Grasas: ${fats}g`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  mealTypeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4caf50',
  },
  foodList: {
    marginBottom: 15,
  },
  foodText: {
    fontSize: 16,
    marginVertical: 2,
  },
  nutrientSection: {
    marginTop: 10,
  },
  nutrientText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default MealCard;
