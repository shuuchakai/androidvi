import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Sidebar = props => {

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}>
        <ImageBackground
          source = {require('../assets/background.jpg')}
          style={{padding: 20}}>
          <Image
            source = {require('../assets/user.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              color: 'white',
            }}>
            Username
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginRight: 5,
                color: 'white',
              }}>
              Peso: 22 Kg
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('LandPage');
        }} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text

              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;