import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';
import { tokens } from '../styles/fluentTokens';

export default function HeaderCommandBar({ title }: { title?: string }) {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title ?? 'KOET App'}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('UpdateProfile' as never)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: tokens.spacing.m,
    backgroundColor: tokens.colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: tokens.fontSize.title,
    fontWeight: '700',
    color: tokens.colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: tokens.spacing.s,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: tokens.colors.brand,
    borderRadius: tokens.radius.s,
  },
  buttonText: {
    color: tokens.colors.brandText,
    fontWeight: '600',
  },
});