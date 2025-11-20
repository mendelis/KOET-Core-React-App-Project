import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';
import { RegisterRequest } from '../types/auth';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (/[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8)
      return 'Strong';
    return 'Medium';
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const newUser: RegisterRequest = { firstName, lastName, email, password };
      await signUp(newUser);
      navigation.navigate('Home');
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColor =
    passwordStrength === 'Strong'
      ? '#107C10'
      : passwordStrength === 'Medium'
      ? '#FFB900'
      : '#D13438';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {password.length > 0 && (
        <Text style={{ color: strengthColor, marginBottom: 12 }}>
          Password Strength: {passwordStrength}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0078D4" />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F3F2F1' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#0078D4',
    fontWeight: '500',
  },
});