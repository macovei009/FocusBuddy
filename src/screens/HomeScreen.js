import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/home.webp')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to FocusBuddy</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Focus')}>
          <Text style={styles.buttonText}>Start Focus Session</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
