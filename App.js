import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './src/navigation/AppStack';
import HomePage from './src/pages/HomePage';
import LandPage from './src/pages/LandPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandPage">
        <Stack.Screen 
          name="LandPage" 
          component={LandPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={AuthStack}
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;