import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderCommandBar from './HeaderCommandBar';
import { tokens } from '../styles/fluentTokens';

export const ScreenLayout: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.root}>
    <HeaderCommandBar title={title} />
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  content: {
    flex: 1,
    padding: tokens.spacing.m,
  },
});