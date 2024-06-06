import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import HomePage from '../pages/HomePage';
import Dietas from '../pages/Dietas';
import Perfil  from '../pages/Perfil';
import Rutinas from '../pages/Rutinas';
import FoodPhoto from '../pages/FoodPhoto';
import SideBar from '../components/SideBar';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <SideBar {...props} />}
            screenOptions={{
            drawerActiveBackgroundColor: '#00b4d8',
            drawerActiveTintColor: 'white',
            drawerInactiveTintColor: 'black',
            drawerLabelStyle: { 
                fontSize: 15,
            },
            }}
        >
            <Drawer.Screen 
                name="Home" 
                component={HomePage}
                options={{
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="restaurant" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Dietas" 
                component={Dietas}
                options={{
                    drawerIcon: ({color}) => (
                        <Octicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Rutinas" 
                component={Rutinas}
                options={{
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="fitness-center" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="Perfil" 
                component={Perfil} 
                options={{
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="person" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name="FoodPhoto" 
                component={FoodPhoto} 
                options={{
                    drawerIcon: ({color}) => (
                        <MaterialIcons name="camera-alt" size={24} color="black" />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default AuthStack;