import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';

type Props = {
  onClose: () => void;
};

export default function UserMenuDropdown({ onClose }: Props) {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const handleSelect = (action: string) => {
    onClose();
    switch (action) {
      case 'profile':
        navigation.navigate('Profile');
        break;      
      case 'logout':
        signOut();
        break;
      case 'login':
        navigation.navigate('Login');
        break;
      case 'register':
        navigation.navigate('Register');
        break;
    }
  };

  return (
    <View style={styles.dropdown}>
      {user ? (
        <>
          <TouchableOpacity onPress={() => handleSelect('profile')}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>          
          <TouchableOpacity onPress={() => handleSelect('logout')}>
            <Text style={[styles.menuItem, { color: '#A4262C' }]}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => handleSelect('login')}>
            <Text style={styles.menuItem}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect('register')}>
            <Text style={styles.menuItem}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
});