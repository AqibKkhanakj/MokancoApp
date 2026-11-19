import { MD3LightTheme, type MD3Theme } from 'react-native-paper';
import { colors } from './palette';

export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: colors.canvas,
    onPrimaryContainer: colors.ink,
    background: colors.canvas,
    surface: colors.surface,
    error: colors.danger,
    outline: colors.line,
    onSurface: colors.ink,
    onSurfaceVariant: colors.muted,
  },
};
