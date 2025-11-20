import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';
import UserMenuDropdown from './UserMenuDropdown';

export default function TopBar() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeLink}>KOET</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userIndicator}
        onPress={() => setMenuVisible(prev => !prev)}
      >
        <Text style={styles.userText}>
          {user ? `${user.firstName} ▼` : 'Menu ▼'}
        </Text>
      </TouchableOpacity>

      {menuVisible && <UserMenuDropdown onClose={() => setMenuVisible(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    padding: 16,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  homeLink: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  userText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});