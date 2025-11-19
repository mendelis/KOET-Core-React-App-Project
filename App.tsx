import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/auth/AuthProvider';
import { navigationRef } from './src/navigation/NavigationRef';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={ProfileScreen} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}