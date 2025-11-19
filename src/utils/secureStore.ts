import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const REFRESH_KEY = 'refresh_token';

export const saveRefreshToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(REFRESH_KEY, token);
  } else {
    await SecureStore.setItemAsync(REFRESH_KEY, token);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(REFRESH_KEY);
  } else {
    return await SecureStore.getItemAsync(REFRESH_KEY);
  }
};

export const deleteRefreshToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(REFRESH_KEY);
  } else {
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  }
};