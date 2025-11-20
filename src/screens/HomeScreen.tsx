import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to KOET</Text>
        <Text style={styles.subtitle}>
          KOET protects your data with enterprise-grade encryption, secure authentication, and zero-trust architecture.
        </Text>       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F2F1' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  actionItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: 120,
  },
  actionText: { marginTop: 8, fontSize: 16, color: '#0078D4', fontWeight: '500' },
});