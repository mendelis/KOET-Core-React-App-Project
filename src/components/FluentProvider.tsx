import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../styles/fluentTokens';

// This file is intentionally lightweight — it provides global styling tokens
export const FluentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
});