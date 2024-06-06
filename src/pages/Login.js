import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientText from "react-native-gradient-texts";

export default function Login() {

    const navigation = useNavigation();

    return (
        <View style={styles.login}>
          <View style={styles.login_top}>             
            <GradientText
              text={"Vitatri"}
              style={styles.login_top_title}
              isGradientFill
              fontSize={65}
              gradientColors={['#C1EBB9', '#73BC65', '#426B3A']}
            />
          </View>
          <View style={styles.login_bottom}> 
          <GradientText
              text={"Iniciar Sesión"}
              style={styles.login_bottom_title}
              isGradientFill
              fontSize={30}
              gradientColors={['#B16060', '#D76322']}
            />

            <View style={styles.login_bottom_form}>
              <Text style={styles.login_bottom_form_label}>Correo Electronico</Text> 
              <TextInput
                style={styles.login_bottom_form_input}
                placeholder="Correo Electronico"
              />
              <Text style={styles.login_bottom_form_label}>Contraseña</Text> 
              <TextInput
                style={styles.login_bottom_form_input}
                placeholder="Contraseña"
              />
              <TouchableOpacity style={styles.login_bottom_form_button} onPress={() => navigation.navigate('HomePage')}>
                <Text style={styles.login_bottom_form_button_text}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center'}}>
                <Text style={{color: '#64311C', fontSize: 15}}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#C39051', fontSize: 15}}>Crea Una</Text>
                </TouchableOpacity>  
              </View>
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
        marginTop: 100,
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

      login_bottom_form_input: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 20,
        padding: 8,
        fontSize: 15,
      },

      login_bottom_form_label: {
        alignSelf: 'flex-start',
        fontSize: 15,
        marginBottom: 5,
      }, 
      
      login_bottom_form_button: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#204948',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
      },

      login_bottom_form_button_text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
      },
    });
    