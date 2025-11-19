import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { tokens } from '../styles/fluentTokens';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

type HeaderCommandBarProps = {
  title?: string;
  showAvatar?: boolean;
};

export default function HeaderCommandBar({ title = 'App', showAvatar = true }: HeaderCommandBarProps) {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Text style={styles.appTitle}>{title}</Text>
      </View>

      <View style={styles.center} />

      <View style={styles.right}>
        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.iconText}>Home</Text>
        </Pressable>

        <Pressable style={styles.iconButton} onPress={() => navigation.navigate('UpdateProfile' as never)}>
          <Text style={styles.iconText}>Edit</Text>
        </Pressable>

        {showAvatar && (
          <Pressable
            style={styles.avatarWrap}
            onPress={() => {
              // open profile or menu
              navigation.navigate('Home' as never);
            }}
          >
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{user?.firstName?.[0] ?? 'U'}</Text>
              </View>
            )}
          </Pressable>
        )}

        <Pressable style={styles.signOut} onPress={async () => await signOut()}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    paddingHorizontal: tokens.spacing.m,
    backgroundColor: tokens.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E1DFDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  appTitle: {
    color: tokens.colors.textPrimary,
    fontWeight: '700',
    fontSize: 18,
  },
  center: { flex: 1 },
  right: { flexDirection: 'row', alignItems: 'center' },
  iconButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: tokens.radius.s,
    marginRight: 8,
  },
  iconText: {
    color: tokens.colors.textPrimary,
    fontWeight: '600',
  },
  avatarWrap: {
    marginLeft: 6,
    marginRight: 10,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DAD9D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { color: '#605E5C', fontWeight: '700' },
  signOut: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radius.s,
    backgroundColor: 'transparent',
  },
  signOutText: {
    color: '#a4262c',
    fontWeight: '600',
  },
});