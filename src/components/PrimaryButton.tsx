import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../theme/useTheme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export default function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: Props) {
  const theme = useTheme();
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{disabled: disabled || loading}}
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isOutline ? 'transparent' : theme.primary,
          borderColor: theme.primary,
          borderWidth: isOutline ? 1.5 : 0,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isOutline ? theme.primary : theme.primaryText} />
      ) : (
        <Text
          style={[
            styles.label,
            {color: isOutline ? theme.primary : theme.primaryText},
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
