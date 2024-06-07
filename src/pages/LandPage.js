import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientText from "react-native-gradient-texts";

// import WatermelonIcon from "../icons/WatermelonIcon.js";

import SigninCard from "../components/SinginCard.js";


export default function LandPage() {

    const navigation = useNavigation();

    return (
        <View style={styles.login}>
          <View style={styles.login_top}>             
            <GradientText
              text={"Vitatri"}
              style={styles.login_top_title}
              isGradientFill
              fontSize={65}
              gradientColors={['#0077b6', '#48cae4']}
            />
          </View>
          <View style={styles.login_bottom}> 
            <GradientText
              text={"Iniciar Sesión"}
              style={styles.login_bottom_title}
              isGradientFill
              fontSize={30}
              gradientColors={['#560bad', '#4895ef']}
            />

            <View style={styles.login_bottom_form}>
                <SigninCard />
            </View>
          </View>   
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      login: {
      },
      
      login_top: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      login_top_title: {
        marginTop: 50,
      },

      login_bottom: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      login_bottom_title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
      },

      login_bottom_form: {
        width: '80%',
      },
    });