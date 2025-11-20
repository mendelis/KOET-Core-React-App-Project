import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

type Props = {
  source?: any; // optional image source
  initials?: string; // fallback initials if no image
  size?: number; // optional size override
};

export default function UserAvatar({ source, initials, size = 120 }: Props) {
  const dimension = size;
  const radius = size / 2;

  if (source) {
    return <Image source={source} style={[styles.avatar, { width: dimension, height: dimension, borderRadius: radius }]} />;
  }

  return (
    <View style={[styles.fallback, { width: dimension, height: dimension, borderRadius: radius }]}>
      <Text style={styles.initials}>{initials || '?'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
    backgroundColor: '#ccc',
  },
  fallback: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});