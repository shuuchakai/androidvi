import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const UserProfileCard = ({ user }) => {
  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
            <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfo}>{user.additionalInfo}</Text>
      </View>
    </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  additionalInfoContainer: {
    marginTop: 10,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#555',
  },
});

export default UserProfileCard;