import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, SectionList, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const windowWidth = Dimensions.get('window').width;

const FOOD_DATABASE = [
  { id: '1', name: 'Manzana', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { id: '2', name: 'Plátano', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: '3', name: 'Pollo', kcal: 239, protein: 27, carbs: 0, fat: 14 },
  { id: '4', name: 'Arroz', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: '5', name: 'Huevo', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: '6', name: 'Espinaca', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: '7', name: 'Tomate', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { id: '8', name: 'Zanahoria', kcal: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { id: '9', name: 'Brócoli', kcal: 55, protein: 3.7, carbs: 11.1, fat: 0.6 },
  { id: '10', name: 'Papa', kcal: 77, protein: 2, carbs: 17, fat: 0.1 },
  { id: '11', name: 'Avena', kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { id: '12', name: 'Lentejas', kcal: 116, protein: 9, carbs: 20, fat: 0.4 },
  { id: '13', name: 'Frijoles', kcal: 347, protein: 21.4, carbs: 63.3, fat: 1.5 },
  { id: '14', name: 'Quinoa', kcal: 120, protein: 4.1, carbs: 21.3, fat: 1.9 },
  { id: '15', name: 'Aguacate', kcal: 160, protein: 2, carbs: 9, fat: 15 },
  { id: '16', name: 'Naranja', kcal: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { id: '17', name: 'Maní', kcal: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
  { id: '18', name: 'Almendra', kcal: 579, protein: 21.2, carbs: 21.6, fat: 49.9 },
  { id: '19', name: 'Nuez', kcal: 654, protein: 15.2, carbs: 13.7, fat: 65.2 },
  { id: '20', name: 'Leche', kcal: 42, protein: 3.4, carbs: 5, fat: 1 },
  { id: '21', name: 'Yogur', kcal: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { id: '22', name: 'Queso', kcal: 402, protein: 25, carbs: 1.3, fat: 33.1 },
  { id: '23', name: 'Tofu', kcal: 76, protein: 8, carbs: 1.9, fat: 4.8 },
  { id: '24', name: 'Salmón', kcal: 208, protein: 20, carbs: 0, fat: 13 },
  { id: '25', name: 'Atún', kcal: 144, protein: 23, carbs: 0, fat: 4.9 },
  { id: '26', name: 'Sardina', kcal: 208, protein: 24.6, carbs: 0, fat: 11.4 },
  { id: '27', name: 'Camarón', kcal: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { id: '28', name: 'Carne de res', kcal: 250, protein: 26, carbs: 0, fat: 15 },
  { id: '29', name: 'Cerdo', kcal: 242, protein: 27, carbs: 0, fat: 14 },
  { id: '30', name: 'Cordero', kcal: 294, protein: 25.6, carbs: 0, fat: 20.9 },
  { id: '31', name: 'Calabaza', kcal: 26, protein: 1, carbs: 7, fat: 0.1 },
  { id: '32', name: 'Pepino', kcal: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { id: '33', name: 'Berenjena', kcal: 25, protein: 1, carbs: 6, fat: 0.2 },
  { id: '34', name: 'Pimiento', kcal: 20, protein: 0.9, carbs: 4.6, fat: 0.2 },
  { id: '35', name: 'Cebolla', kcal: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  { id: '36', name: 'Ajo', kcal: 149, protein: 6.4, carbs: 33.1, fat: 0.5 },
  { id: '37', name: 'Jengibre', kcal: 80, protein: 1.8, carbs: 17.8, fat: 0.7 },
  { id: '38', name: 'Fresa', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  { id: '39', name: 'Arándano', kcal: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
  { id: '40', name: 'Uva', kcal: 69, protein: 0.7, carbs: 18.1, fat: 0.2 },
  { id: '41', name: 'Pera', kcal: 57, protein: 0.4, carbs: 15, fat: 0.1 },
  { id: '42', name: 'Melocotón', kcal: 39, protein: 0.9, carbs: 10, fat: 0.3 },
  { id: '43', name: 'Sandía', kcal: 30, protein: 0.6, carbs: 8, fat: 0.2 },
  { id: '44', name: 'Piña', kcal: 50, protein: 0.5, carbs: 13, fat: 0.1 },
  { id: '45', name: 'Mango', kcal: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { id: '46', name: 'Cereza', kcal: 50, protein: 1, carbs: 12, fat: 0.3 },
  { id: '47', name: 'Kiwi', kcal: 61, protein: 1.1, carbs: 15, fat: 0.5 },
  { id: '48', name: 'Papaya', kcal: 43, protein: 0.5, carbs: 11, fat: 0.3 },
  { id: '49', name: 'Granada', kcal: 83, protein: 1.7, carbs: 19, fat: 1.2 },
  { id: '50', name: 'Melón', kcal: 34, protein: 0.8, carbs: 8, fat: 0.2 },
  { id: '51', name: 'Coco', kcal: 354, protein: 3.3, carbs: 15.2, fat: 33.5 },
  { id: '52', name: 'Limón', kcal: 29, protein: 1.1, carbs: 9.3, fat: 0.3 },
  { id: '53', name: 'Higo', kcal: 74, protein: 0.8, carbs: 19, fat: 0.3 },
  { id: '54', name: 'Datil', kcal: 282, protein: 2.5, carbs: 75, fat: 0.4 },
  { id: '55', name: 'Pasas', kcal: 299, protein: 3.1, carbs: 79.2, fat: 0.5 },
  { id: '56', name: 'Ciruela', kcal: 46, protein: 0.7, carbs: 11.4, fat: 0.3 },
  { id: '57', name: 'Aceituna', kcal: 115, protein: 0.8, carbs: 6.3, fat: 10.7 },
  { id: '58', name: 'Champiñón', kcal: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  { id: '59', name: 'Espárrago', kcal: 20, protein: 2.2, carbs: 3.9, fat: 0.1 },
  { id: '60', name: 'Col rizada', kcal: 49, protein: 4.3, carbs: 8.8, fat: 0.9 },
  { id: '61', name: 'Coliflor', kcal: 25, protein: 1.9, carbs: 4.9, fat: 0.3 },
  { id: '62', name: 'Repollo', kcal: 25, protein: 1.3, carbs: 6, fat: 0.1 },
  { id: '63', name: 'Lechuga', kcal: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  { id: '64', name: 'Acelga', kcal: 19, protein: 1.8, carbs: 3.7, fat: 0.2 },
  { id: '65', name: 'Remolacha', kcal: 43, protein: 1.6, carbs: 10, fat: 0.2 },
  { id: '66', name: 'Nabo', kcal: 28, protein: 0.9, carbs: 6.4, fat: 0.1 },
  { id: '67', name: 'Rábano', kcal: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
  { id: '68', name: 'Apio', kcal: 16, protein: 0.7, carbs: 3, fat: 0.2 },
  { id: '69', name: 'Perejil', kcal: 36, protein: 3, carbs: 6, fat: 0.8 },
  { id: '70', name: 'Albahaca', kcal: 23, protein: 3.2, carbs: 2.7, fat: 0.6 },
  { id: '71', name: 'Tomillo', kcal: 101, protein: 5.6, carbs: 24.5, fat: 1.7 },
  { id: '72', name: 'Orégano', kcal: 265, protein: 9, carbs: 69, fat: 4.3 },
  { id: '73', name: 'Romero', kcal: 131, protein: 3.3, carbs: 20.7, fat: 5.9 },
  { id: '74', name: 'Menta', kcal: 70, protein: 3.8, carbs: 15, fat: 0.9 },
  { id: '75', name: 'Cilantro', kcal: 23, protein: 2.1, carbs: 3.7, fat: 0.5 },
  { id: '76', name: 'Eneldo', kcal: 43, protein: 3.5, carbs: 7, fat: 1.1 },
  { id: '77', name: 'Salvia', kcal: 315, protein: 11, carbs: 61, fat: 12.8 },
  { id: '78', name: 'Miel', kcal: 304, protein: 0.3, carbs: 82.4, fat: 0 },
  { id: '79', name: 'Azúcar', kcal: 387, protein: 0, carbs: 100, fat: 0 },
  { id: '80', name: 'Canela', kcal: 247, protein: 4, carbs: 81, fat: 1.2 },
  { id: '81', name: 'Pimienta negra', kcal: 255, protein: 10.4, carbs: 64, fat: 3.3 },
  { id: '82', name: 'Comino', kcal: 375, protein: 17.8, carbs: 44.2, fat: 22.3 },
  { id: '83', name: 'Clavo', kcal: 274, protein: 6, carbs: 66, fat: 13 },
  { id: '84', name: 'Nuez moscada', kcal: 525, protein: 6, carbs: 49, fat: 36 },
  { id: '85', name: 'Jalapeño', kcal: 29, protein: 0.9, carbs: 6.5, fat: 0.4 },
  { id: '86', name: 'Chile habanero', kcal: 40, protein: 1.9, carbs: 8.8, fat: 0.4 },
  { id: '87', name: 'Chile serrano', kcal: 32, protein: 1, carbs: 7.5, fat: 0.4 },
  { id: '88', name: 'Aceite de oliva', kcal: 884, protein: 0, carbs: 0, fat: 100 },
  { id: '89', name: 'Aceite de coco', kcal: 862, protein: 0, carbs: 0, fat: 100 },
  { id: '90', name: 'Aceite de girasol', kcal: 884, protein: 0, carbs: 0, fat: 100 },
  { id: '91', name: 'Vinagre', kcal: 18, protein: 0, carbs: 0.9, fat: 0 },
  { id: '92', name: 'Salsa de soya', kcal: 53, protein: 8.1, carbs: 4.9, fat: 0.6 },
  { id: '93', name: 'Mostaza', kcal: 66, protein: 4.4, carbs: 5.5, fat: 3.6 },
  { id: '94', name: 'Mayonesa', kcal: 680, protein: 1, carbs: 1, fat: 75 },
  { id: '95', name: 'Ketchup', kcal: 112, protein: 1.3, carbs: 26.7, fat: 0.1 },
  { id: '96', name: 'Barbacoa', kcal: 124, protein: 1.2, carbs: 29, fat: 0.3 },
  { id: '97', name: 'Ajo en polvo', kcal: 331, protein: 16.6, carbs: 72.7, fat: 0.7 },
  { id: '98', name: 'Cebolla en polvo', kcal: 341, protein: 10, carbs: 79.1, fat: 1.4 },
  { id: '99', name: 'Curry', kcal: 325, protein: 14, carbs: 58, fat: 14 },
  { id: '100', name: 'Sésamo', kcal: 573, protein: 17, carbs: 23, fat: 49.7 },
  { id: '101', name: 'Chía', kcal: 486, protein: 16.5, carbs: 42.1, fat: 30.7 },
  { id: '102', name: 'Lino', kcal: 534, protein: 18.3, carbs: 28.9, fat: 42.2 },
  { id: '103', name: 'Anacardo', kcal: 553, protein: 18.2, carbs: 30.2, fat: 43.8 },
  { id: '104', name: 'Castaña', kcal: 213, protein: 2.4, carbs: 45.5, fat: 2.2 },
  { id: '105', name: 'Avellana', kcal: 628, protein: 15, carbs: 16.7, fat: 60.8 },
  { id: '106', name: 'Macadamia', kcal: 718, protein: 7.9, carbs: 13.8, fat: 75.8 },
  { id: '107', name: 'Pistacho', kcal: 562, protein: 20, carbs: 27, fat: 45.8 },
  { id: '108', name: 'Calabacín', kcal: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
  { id: '109', name: 'Chayote', kcal: 19, protein: 0.8, carbs: 4.5, fat: 0.1 },
  { id: '110', name: 'Yuca', kcal: 160, protein: 1.4, carbs: 38.1, fat: 0.3 }
];

const MealSection = ({ title, mealData, onAddFood }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredFood, setFilteredFood] = useState([]);

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const results = FOOD_DATABASE.filter(food =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFood(results);
  };

  return (
    <View style={styles.mealSection}>
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealDetails}>{mealData.kcal.toFixed(1)} kcal | {mealData.protein.toFixed(1)} P | {mealData.carbs.toFixed(1)} C | {mealData.fat.toFixed(1)} F</Text>
      <FlatList
        data={mealData.foods}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text>{item.name}</Text>
            <Text>{item.kcal} kcal</Text>
          </View>
        )}
      />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAdd}>
          <Text style={styles.actionButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Buscar alimentos</Text>
            <TextInput
              style={styles.input}
              placeholder="Buscar..."
              value={searchText}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredFood}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.foodItem}
                  onPress={() => {
                    onAddFood(title, item);
                    setModalVisible(false);
                    setSearchText('');
                    setFilteredFood([]);
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.kcal} kcal</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setSearchText('');
                setFilteredFood([]);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Dietas = () => {
  const [meals, setMeals] = useState({
    Desayuno: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
    Almuerzo: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
    Snack: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
    Comida: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
  });

  const [adjustedCalories, setAdjustedCalories] = useState(0);
  const [macros, setMacros] = useState({ proteinGrams: 0, carbGrams: 0, fatGrams: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = JSON.parse(await AsyncStorage.getItem('user'));
        console.log(userId.id);
        const response = await axios.post(API_URL + '/profile/get', { user_id: userId.id });
        const { adjustedCalories, macros } = response.data;

        setAdjustedCalories(adjustedCalories);
        setMacros(macros);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchConsumption = async () => {
      try {
        const userId = JSON.parse(await AsyncStorage.getItem('user'));
        const today = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD

        const response = await axios.get(API_URL + '/consumption/get', {
          params: { user_id: userId.id, date: today }
        });

        const consumptionData = response.data;

        const mealsData = {
          Desayuno: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
          Almuerzo: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
          Snack: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
          Comida: { kcal: 0, protein: 0, carbs: 0, fat: 0, foods: [] },
        };

        consumptionData.forEach(consumption => {
          const { meal, food } = consumption;
          mealsData[meal].kcal += food.kcal;
          mealsData[meal].protein += food.protein;
          mealsData[meal].carbs += food.carbs;
          mealsData[meal].fat += food.fat;
          mealsData[meal].foods.push(food);
        });

        setMeals(mealsData);
      } catch (error) {
        console.error('Error fetching consumption data:', error.message);
      }
    };

    fetchProfile();
    fetchConsumption(); 
  }, []);

  const handleAddFood = async (meal, food) => {
    setMeals(prevMeals => {
      const updatedMeal = {
        ...prevMeals[meal],
        kcal: prevMeals[meal].kcal + (food.kcal || 0),
        protein: prevMeals[meal].protein + (food.protein || 0),
        carbs: prevMeals[meal].carbs + (food.carbs || 0),
        fat: prevMeals[meal].fat + (food.fat || 0),
        foods: [...prevMeals[meal].foods, food],
      };
      return { ...prevMeals, [meal]: updatedMeal };
    });

    // POST request to backend
    try {
      const userId = JSON.parse(await AsyncStorage.getItem('user'));
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      await axios.post(API_URL + '/consumption/update', {
        user_id: userId.id,
        date: today,
        meal: meal,
        food: {
          id: food.id,
          name: food.name,
          kcal: food.kcal,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
        }
      });
    } catch (error) {
      console.error('Error updating food consumption:', error);
    }
  };

  const totalKcal = Object.values(meals).reduce((sum, meal) => sum + meal.kcal, 0);
  const totalProtein = Object.values(meals).reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = Object.values(meals).reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = Object.values(meals).reduce((sum, meal) => sum + meal.fat, 0);

  const dailyGoalKcal = adjustedCalories;
  const dailyGoalProtein = macros.proteinGrams;
  const dailyGoalCarbs = macros.carbGrams;
  const dailyGoalFat = macros.fatGrams;

  const TABS = ['Calorías', 'Proteínas', 'Carbohidratos', 'Grasas'];

  const [activeTab, setActiveTab] = useState(0);

  const sections = Object.keys(meals).map(meal => ({
    title: meal,
    data: [{ ...meals[meal], mealName: meal }],
  }));

  <View style={styles.tabContainer}>
    {TABS.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.tabButton,
          activeTab === index && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab(index)}
      >
        <Text style={styles.tabButtonText}>{tab}</Text>
      </TouchableOpacity>
    ))}
  </View>

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={styles.chartContainer}
        contentContainerStyle={{ justifyContent: 'space-between' }}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const activeIndex = Math.round(xOffset / windowWidth);
          setActiveTab(activeIndex);
        }}
        scrollEventThrottle={200}
      >
        <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContent}>
              <Text style={styles.chartTitle}>Calorías</Text>
              <PieChart
                data={[
                  { value: Math.min(totalKcal, dailyGoalKcal), color: '#52B69A' },
                  { value: Math.max(0, dailyGoalKcal - totalKcal), color: '#184e77' },
                ]}
                donut
                showText
                textSize={16}
                textColor="black"
                innerRadius={70}
                radius={100}
                textStyle={{ color: 'black' }}
                centerLabelComponent={() => <Text style={styles.centeredText}>{`${((totalKcal / dailyGoalKcal) * 100).toFixed(0)}%`}</Text>}
              />
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContent}>
              <Text style={styles.chartTitle}>Proteínas</Text>
              <PieChart
                data={[
                  { value: Math.min(totalProtein, dailyGoalProtein), color: '#52B69A' },
                  { value: Math.max(0, dailyGoalProtein - totalProtein), color: '#184e77' },
                ]}
                donut
                showText
                textSize={16}
                textColor="black"
                innerRadius={70}
                radius={100}
                textStyle={{ color: 'black' }}
                centerLabelComponent={() => <Text style={styles.centeredText}>{`${((totalProtein / dailyGoalProtein) * 100).toFixed(0)}%`}</Text>}
              />
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContent}>
              <Text style={styles.chartTitle}>Carbohidratos</Text>
              <PieChart
                data={[
                  { value: Math.min(totalCarbs, dailyGoalCarbs), color: '#52B69A' },
                  { value: Math.max(0, dailyGoalCarbs - totalCarbs), color: '#184e77' },
                ]}
                donut
                showText
                textSize={16}
                textColor="black"
                innerRadius={70}
                radius={100}
                textStyle={{ color: 'black' }}
                centerLabelComponent={() => <Text style={styles.centeredText}>{`${((totalCarbs / dailyGoalCarbs) * 100).toFixed(0)}%`}</Text>}
              />
            </View>
          </View>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContent}>
              <Text style={styles.chartTitle}>Grasas</Text>
              <PieChart
                data={[
                  { value: Math.min(totalFat, dailyGoalFat), color: '#52B69A' },
                  { value: Math.max(0, dailyGoalFat - totalFat), color: '#184e77' },
                ]}
                donut
                showText
                textSize={16}
                textColor="black"
                innerRadius={70}
                radius={100}
                textStyle={{ color: 'black' }}
                centerLabelComponent={() => <Text style={styles.centeredText}>{`${((totalFat / dailyGoalFat) * 100).toFixed(0)}%`}</Text>}
              />
            </View>
          </View>

        </View>
      </ScrollView>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <MealSection
            title={item.mealName}
            mealData={meals[item.mealName]}
            onAddFood={handleAddFood}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  mealSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealDetails: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  foodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
  },
  centeredText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTabButton: {
    backgroundColor: '#ddd',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 40,
  },
  chartWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  chartContent: {
    alignItems: 'center',
  },

});

export default Dietas;
