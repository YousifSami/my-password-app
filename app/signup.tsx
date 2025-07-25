import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { auth } from '../config/firebase';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.loginLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 25,
  },
});
