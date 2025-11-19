import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { ScreenLayout } from '../components/ScreenLayout';
import { tokens } from '../styles/fluentTokens';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScreenLayout title="Profile">
      <View style={styles.card}>
        {user ? (
          <>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.value}>No user data</Text>
        )}
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
  label: {
    fontWeight: '600',
    color: tokens.colors.textSecondary,
    marginTop: tokens.spacing.m,
  },
  value: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textPrimary,
    marginBottom: tokens.spacing.s,
  },
});