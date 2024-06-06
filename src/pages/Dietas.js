import React, {useRef, useState} from 'react';
import { View, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PageTitle from '../components/PageTitle';
import CalorieCard from '../components/CalorieCard';
import MealCard from '../components/MealCard';

let fecha = new Date();
let diaSemanaNumero = fecha.getDay(); 

let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

let diaSemanaNombre = diasSemana[diaSemanaNumero];


const caloriesConsumed = 1200;
  const caloriesGoal = 2000;
  const macronutrients = {
    proteins: 80,
    carbs: 200,
    fats: 50,
  };

  const meals = [
    {
      mealType: 'Desayuno',
      foods: ['Avena', 'Plátano', 'Leche'],
      calories: 350,
      macronutrients: {
        proteins: 15,
        carbs: 60,
        fats: 8,
      },
    },
    {
      mealType: 'Comida',
      foods: ['Pechuga de pollo', 'Arroz integral', 'Brócoli'],
      calories: 600,
      macronutrients: {
        proteins: 40,
        carbs: 80,
        fats: 15,
      },
    },
    {
      mealType: 'Snack',
      foods: ['Manzana', 'Almendras'],
      calories: 200,
      macronutrients: {
        proteins: 5,
        carbs: 25,
        fats: 10,
      },
    },
    {
      mealType: 'Cena',
      foods: ['Salmón', 'Quinoa', 'Espinacas'],
      calories: 450,
      macronutrients: {
        proteins: 30,
        carbs: 50,
        fats: 20,
      },
    },
  ];

const Dietas = () => {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1, margin : 10}}>
            <PageTitle title={"Hoy " + diaSemanaNombre} style={{marginBottom: 20}}/>
            <CalorieCard
                caloriesConsumed={caloriesConsumed}
                caloriesGoal={caloriesGoal}
                macronutrients={macronutrients}
            />
            <ScrollView>
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            mealType={meal.mealType}
            foods={meal.foods}
            calories={meal.calories}
            macronutrients={meal.macronutrients}
          />
        ))}
      </ScrollView>
        </View>
    )
}

export default Dietas;