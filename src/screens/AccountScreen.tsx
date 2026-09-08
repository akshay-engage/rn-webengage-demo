import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';
import {useTheme} from '../theme/useTheme';
import PrimaryButton from '../components/PrimaryButton';

export default function AccountScreen() {
  const theme = useTheme();
  const {name, isGuest, logout} = useAuth();
  const {clear} = useCart();

  const displayName = name && !isGuest ? name : 'Guest';

  const onLogout = () => {
    clear();
    logout();
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safe, {backgroundColor: theme.background}]}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={[styles.avatar, {backgroundColor: theme.primary}]}>
            <Ionicons name="person" size={36} color={theme.primaryText} />
          </View>
          <Text style={[styles.name, {color: theme.text}]}>{displayName}</Text>
          <Text style={[styles.sub, {color: theme.textMuted}]}>
            {isGuest ? 'Browsing as a guest' : 'Signed in'}
          </Text>
        </View>

        <PrimaryButton label="Logout" onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1, padding: 24, justifyContent: 'space-between'},
  profile: {alignItems: 'center', marginTop: 40},
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {fontSize: 24, fontWeight: '800', marginTop: 16},
  sub: {fontSize: 14, marginTop: 6},
});
