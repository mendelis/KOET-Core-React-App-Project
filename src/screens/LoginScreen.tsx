import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { tokens } from '../styles/fluentTokens';
import { useAuth } from '../hooks/useAuth';

// Simple Fluent-like primitives using RN components styled with tokens
const FluentButton: React.FC<{ title: string; onPress: () => void; primary?: boolean }> = ({ title, onPress, primary }) => (
  <View style={[styles.button, primary && styles.primaryButton]}>
    <Text onPress={onPress} style={[styles.buttonText, primary && styles.primaryText]}>{title}</Text>
  </View>
);

const FluentTextInput: React.FC<any> = (props) => (
  <View style={styles.field}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={styles.inputBox}>
      <Text {...props} />
    </View>
  </View>
);

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

        <View style={{ marginTop: tokens.spacing.m }} />
        <Text style={styles.label}>Email</Text>
        <View style={styles.input}>
          <Text onPress={() => {}}>{/* replace with TextInput in your real code */}</Text>
        </View>

        <View style={{ height: 12 }} />
        <Text style={styles.label}>Password</Text>
        <View style={styles.input}>
          <Text onPress={() => {}}>{/* replace with TextInput secureTextEntry */}</Text>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={{ height: tokens.spacing.m }} />
        <FluentButton title="Sign in" onPress={onSubmit} primary />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.m },
  card: { width: '100%', maxWidth: 420, backgroundColor: tokens.colors.surface, padding: tokens.spacing.l, borderRadius: tokens.radius.m, elevation: 2 },
  title: { fontSize: tokens.fontSize.title, fontWeight: '700', color: tokens.colors.textPrimary },
  subtitle: { color: '#605E5C', marginTop: 6 },
  label: { color: '#605E5C', marginBottom: 6 },
  input: { height: 44, backgroundColor: '#fff', borderRadius: 6, paddingHorizontal: 12, justifyContent: 'center' },
  error: { color: '#a4262c', marginTop: 8 },
  button: { marginTop: 12, paddingVertical: 12, borderRadius: tokens.radius.s, alignItems: 'center', backgroundColor: '#E1DFDD' },
  primaryButton: { backgroundColor: tokens.colors.brand },
  buttonText: { color: '#000' , fontWeight: '600'},
  primaryText: { color: tokens.colors.brandText },
  field: {},
  inputBox: {},
});