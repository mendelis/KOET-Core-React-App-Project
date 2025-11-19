import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/auth/AuthProvider';
import { navigationRef } from './src/navigation/NavigationRef';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import { ScreenLayout } from './src/components/ScreenLayout';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  UpdateProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Wrapped =
  (Component: React.ComponentType<any>, title?: string) =>
  (props: any) =>
    (
      <ScreenLayout title={title}>
        <Component {...props} />
      </ScreenLayout>
    );

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }} // disable native header because we use ScreenLayout
        >
          <Stack.Screen name="Login" component={Wrapped(LoginScreen, 'Sign In')} />
          <Stack.Screen name="Home" component={Wrapped(ProfileScreen, 'Profile')} />
          <Stack.Screen name="UpdateProfile" component={Wrapped(UpdateProfileScreen, 'Edit Profile')} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}