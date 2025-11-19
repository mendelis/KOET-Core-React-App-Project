import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEY = (k: string) => `koet:${k}`;

const hasNative = typeof SecureStore.getItemAsync === 'function' && Platform.OS !== 'web';

export const saveRefreshToken = async (token: string) => {
  if (!hasNative) {
    localStorage.setItem(KEY('refreshToken'), token);
    return;
  }
  await SecureStore.setItemAsync(KEY('refreshToken'), token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  if (!hasNative) {
    return localStorage.getItem(KEY('refreshToken'));
  }
  return SecureStore.getItemAsync(KEY('refreshToken'));
};

export const deleteRefreshToken = async () => {
  if (!hasNative) {
    localStorage.removeItem(KEY('refreshToken'));
    return;
  }
  await SecureStore.deleteItemAsync(KEY('refreshToken'));
};