import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { ScreenLayout } from '../components/ScreenLayout';
import { tokens } from '../styles/fluentTokens';

export default function UpdateProfileScreen() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const onSave = () => {
    // TODO: call update API
    console.log('Updated:', { firstName, lastName, email });
  };

  return (
    <ScreenLayout title="Update Profile">
      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
        <Pressable style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.l,
    borderRadius: tokens.radius.m,
    elevation: 2,
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
  button: {
    backgroundColor: tokens.colors.brand,
    paddingVertical: 12,
    borderRadius: tokens.radius.s,
    alignItems: 'center',
    marginTop: tokens.spacing.m,
  },
  buttonText: {
    color: tokens.colors.brandText,
    fontWeight: '600',
  },
});