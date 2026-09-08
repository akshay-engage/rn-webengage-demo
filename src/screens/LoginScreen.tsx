import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../theme/useTheme';
import {appConfig} from '../data/catalog';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen() {
  const theme = useTheme();
  const {login, loginAsGuest} = useAuth();
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.platformBadge, {backgroundColor: theme.primary}]}>
              <Text style={[styles.platformBadgeText, {color: theme.primaryText}]}>
                {appConfig.platformNote}
              </Text>
            </View>
            <Text style={[styles.title, {color: theme.text}]}>
              {appConfig.title}
            </Text>
            <Text style={[styles.tagline, {color: theme.textMuted}]}>
              {appConfig.tagline}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={[styles.label, {color: theme.textMuted}]}>
              Your name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={theme.textMuted}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={() => login(name)}
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  color: theme.text,
                },
              ]}
            />

            <PrimaryButton
              label="Login"
              onPress={() => login(name)}
              disabled={name.trim().length === 0}
              style={styles.spaced}
            />
            <PrimaryButton
              label="Skip login"
              variant="outline"
              onPress={loginAsGuest}
              style={styles.spaced}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  flex: {flex: 1},
  container: {flex: 1, padding: 24, justifyContent: 'center'},
  header: {marginBottom: 40, alignItems: 'center'},
  platformBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 14,
  },
  platformBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {fontSize: 32, fontWeight: '800', marginBottom: 8},
  tagline: {fontSize: 15, textAlign: 'center'},
  form: {width: '100%'},
  label: {fontSize: 13, marginBottom: 8, marginLeft: 4},
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  spaced: {marginTop: 14},
});
