import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      // source={require('../assets/bg-gradient.jpg')} // Replace with your own background
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>PasswordVault</Text>
        <Text style={styles.subtitle}>Secure all your passwords in one place.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')} 
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: 'bold',
  },
});