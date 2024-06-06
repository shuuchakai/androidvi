import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

const CalorieCard = ({ caloriesConsumed, caloriesGoal, macronutrients }) => {
    const { proteins, carbs, fats } = macronutrients;
    const caloriesRemaining = caloriesGoal - caloriesConsumed;

    const pieData = [
        {value: caloriesConsumed, color: '#008000'},
        {value: caloriesRemaining, color: 'lightgray'},
    ];

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.caloriesText}>{caloriesConsumed}</Text>
        <Text style={styles.caloriesText}>Consumidas</Text>
      </View>
      <View style={styles.centerSection}>
        <PieChart
                donut
                radius={60}
                innerRadius={50}
                data={pieData}
                showGradient
                centerLabelComponent={() => {
                return (
                    <>
                    <Text style={{fontSize: 16, textAlign: 'center'}}>{caloriesRemaining}</Text>
                    <Text style={{fontSize: 16, textAlign: 'center'}}>Restantes</Text>
                    </>
                )
                }}
        />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.macroText}>Proteínas:</Text>
        <Text style={styles.macroText}>{macronutrients.proteins} g</Text>
        <Text style={styles.macroText}>Carbohidratos:</Text>
        <Text style={styles.macroText}>{macronutrients.carbs} g</Text>
        <Text style={styles.macroText}>Grasas:</Text>
        <Text style={styles.macroText}>{macronutrients.fats} g</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,    
    alignItems: 'flex-end',
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  macroText: {
    fontSize: 14,
    marginVertical: 1,
    textAlign: 'right',
  },
});

export default CalorieCard;
