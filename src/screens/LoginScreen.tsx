import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { tokens } from '../styles/fluentTokens';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      await signIn({ email, password });
    } catch (e: any) {
      setError(e?.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Use your account to continue</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.m,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.l,
    borderRadius: tokens.radius.m,
    elevation: 2,
  },
  title: {
    fontSize: tokens.fontSize.title,
    fontWeight: '700',
    color: tokens.colors.textPrimary,
  },
  subtitle: {
    color: tokens.colors.textSecondary,
    marginTop: 6,
    marginBottom: tokens.spacing.m,
  },
  field: {
    marginBottom: tokens.spacing.m,
  },
  label: {
    color: tokens.colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: tokens.radius.s,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  error: {
    color: tokens.colors.error,
    marginBottom: tokens.spacing.m,
  },
  button: {
    backgroundColor: tokens.colors.brand,
    paddingVertical: 12,
    borderRadius: tokens.radius.s,
    alignItems: 'center',
  },
  buttonText: {
    color: tokens.colors.brandText,
    fontWeight: '600',
  },
});