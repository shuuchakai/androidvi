import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const customDataPoint = () => {
  return (
      <View
      style={{
          width: 10,
          height: 10,
          backgroundColor: '#48cae4',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: 'white',
      }}
      />
  );
};

const customDataPointLabel = val => {
  return (
      <View
      style={{
          backgroundColor: 'black',
          paddingHorizontal: 8,
          paddingVertical: 5,
          borderRadius: 4,
      }}
      >
      <Text style={{color: 'white'}}>{val}</Text>
      </View>
  );
};

const WeightLogCard = ({ weightData }) => {
  const screenWidth = Dimensions.get('window').width;

  const graphData = weightData.map(entry => ({
    label: entry.date,
    value: entry.weight,
    dataPointText: entry.weight,
    customDataPoint: customDataPoint,
    dataPointLabelComponent: () => customDataPointLabel(entry.weight + ' Kg')
  }));

  const getMaxWeight = (weightData) => {
    return Math.max(...weightData.map(entry => entry.weight));
  };

const headerComponet = () => {
  return(
    <>
    <Text style={styles.title}>Registro de Peso</Text>
      <LineChart
        focusEnabled
        showTextOnFocus
        showStripOnFocus  
        data={graphData} 
        color={'#48cae4'}
        thickness={3}
        showVerticalLines
        hideRules
        areaChart
        startFillColor="rgb(46, 217, 255)"
        startOpacity={0.15}
        endFillColor="rgb(46, 217, 255)"
        endOpacity={0.15}
        noOfSections={5}
        stepHeight={30}
        spacing={70}
        width={screenWidth-140}
        stripWidth={3}
        stripColor={'#48cae4'}
        stripOpacity={0.8}
        maxValue={getMaxWeight(weightData) + 10}
    
      />
      <Text style={styles.subTitle}>Detalles del Registro</Text>
    </>
  )
}

  return (
  <View style={styles.card}>
    <FlatList
        ListHeaderComponent={headerComponet}
        data={weightData}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.date}: {item.weight} kg</Text>
          </View>
        )}
    />
  </View>  
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
  },
});

export default WeightLogCard;
