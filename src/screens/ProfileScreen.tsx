import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import UserAvatar from '../components/UserAvatar';

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
  }, [user]);

  if (!user) {
    return null; // prevent rendering before redirect
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <UserAvatar
          source={require('../../assets/avatar-placeholder.png')}
          initials={`${user.firstName[0]}${user.lastName[0]}`}
        />
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F2F1' },
  content: { paddingTop: 100, alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: '600', marginTop: 12 },
  email: { fontSize: 16, color: '#666', marginTop: 4 },
});