import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { tokens } from '../styles/fluentTokens';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  if (!user) return <Text>Not signed in</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {user.photoUrl ? <Image source={{ uri: user.photoUrl }} style={styles.avatar} /> : <View style={styles.avatarPlaceholder} />}
        <View style={styles.info}>
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.actions}>
          <Text style={styles.edit} onPress={() => { /* navigate to edit */ }}>Edit</Text>
          <Text style={styles.signout} onPress={signOut}>Sign out</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: tokens.spacing.m, backgroundColor: tokens.colors.background },
  card: { width: '100%', maxWidth: 720, backgroundColor: tokens.colors.surface, borderRadius: tokens.radius.m, padding: tokens.spacing.m, alignItems: 'center' },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 12 },
  avatarPlaceholder: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#ddd', marginBottom: 12 },
  info: { alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: tokens.colors.textPrimary },
  email: { color: '#605E5C', marginTop: 4 },
  actions: { flexDirection: 'row', marginTop: 16 },
  edit: { marginRight: 16, color: tokens.colors.brand },
  signout: { color: '#a4262c' },
});