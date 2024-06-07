import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button, ScrollView, Dimensions } from "react-native";
import { BarChart } from 'react-native-gifted-charts';
import { API_URL } from '../utils/constants';

const exerciseOptions = [
    "🏃‍♂️ Correr", "🚴‍♀️ Bicicleta", "🚲 Bicicleta estacionaria", "🏋️‍♀️ Entrenamiento de peso",
    "🤸‍♀️ Entrenamiento HIIT", "💃 Bailar", "🧘‍♀️ Yoga", "🏊‍♀️ Nadar", "⚽ Futbol", "🏀 Basquetball",
    "🎾 Tennis", "🏈 Futbol americano", "🥊 Boxear"
];

const calorieRates = {
    "🏃‍♂️ Correr": 10, "🚴‍♀️ Bicicleta": 8, "🚲 Bicicleta estacionaria": 7, "🏋️‍♀️ Entrenamiento de peso": 6,
    "🤸‍♀️ Entrenamiento HIIT": 12, "💃 Bailar": 5, "🧘‍♀️ Yoga": 4, "🏊‍♀️ Nadar": 9, "⚽ Futbol": 11,
    "🏀 Basquetball": 10, "🎾 Tennis": 9, "🏈 Futbol americano": 12, "🥊 Boxear": 13
};

const colors = {
    "🏃‍♂️ Correr": 'red', "🚴‍♀️ Bicicleta": 'blue', "🚲 Bicicleta estacionaria": 'green', "🏋️‍♀️ Entrenamiento de peso": 'purple',
    "🤸‍♀️ Entrenamiento HIIT": 'orange', "💃 Bailar": 'pink', "🧘‍♀️ Yoga": 'cyan', "🏊‍♀️ Nadar": 'navy', "⚽ Futbol": 'gold',
    "🏀 Basquetball": 'brown', "🎾 Tennis": 'violet', "🏈 Futbol americano": 'maroon', "🥊 Boxear": 'black'
};

const Rutinas = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [duration, setDuration] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [calories, setCalories] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [exercises, setExercises] = useState([]);

    const calculateCalories = (exercise, duration) => {
        const rate = calorieRates[exercise];
        return rate * duration;
    };

    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
        setModalVisible(true);
    };

    const handleDurationSubmit = () => {
        const durationInMinutes = parseFloat(duration);
        const caloriesBurned = calculateCalories(selectedExercise, durationInMinutes);
        setCalories(caloriesBurned);

        const newData = {
            value: caloriesBurned,
            label: selectedExercise,
            frontColor: colors[selectedExercise],
        };
        setData([...data, newData]);

        const newTotalCalories = totalCalories + caloriesBurned;
        setTotalCalories(newTotalCalories);

        const exerciseData = {
            name: selectedExercise,
            duration: durationInMinutes,
            calories: caloriesBurned,
            date: new Date().toISOString().split('T')[0],
        };

        setExercises([...exercises, exerciseData]);
        setModalVisible(false);
        setDuration('');
    };

    const handleSaveAllExercises = async () => {
        const response = await fetch(API_URL + '/exercise/exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ exercises, totalCalories }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    };

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch(API_URL + '/exercise/exercises', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const exercisesData = await response.json();
            setExercises(exercisesData);
        };

        fetchExercises();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rutinas</Text>
            <BarChart
                data={data}
                width={Dimensions.get('window').width - 120}
                height={150}
                barWidth={20}
                barBorderRadius={4}
                barSpacing={10}
                initialSpacing={10}
                noOfSections={4}
                maxValue={1000}
                stepValue={250}
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={{ color: 'gray' }}
            />
            <Text style={styles.totalCaloriesText}>Total de calorías quemadas: {totalCalories}</Text>
            <ScrollView style={styles.exerciseList}>
                {exerciseOptions.map((exercise, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.exerciseButton}
                        onPress={() => handleExerciseSelect(exercise)}
                    >
                        <Text style={styles.exerciseText}>{exercise}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {selectedExercise && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{selectedExercise}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Duración (min)"
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                        />
                        <Button
                            title="Agregar ejercicio"
                            onPress={handleDurationSubmit}
                        />
                        {calories > 0 && (
                            <Text style={styles.caloriesText}>Calorías quemadas: {calories}</Text>
                        )}
                    </View>
                </Modal>
            )}
            <Button
                title="Guardar todos los ejercicios"
                onPress={handleSaveAllExercises}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 40,
        paddingLeft: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    exerciseList: {
        flexDirection: 'column',
    },
    exerciseButton: {
        backgroundColor: '#00b4d8',
        padding: 15,
        margin: 15,
        width: '100%',
    },
    exerciseText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    caloriesText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalCaloriesText: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
});

export default Rutinas;
