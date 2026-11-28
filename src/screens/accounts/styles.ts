import { StyleSheet } from 'react-native';

export const colors = {
  canvas: '#E3E2DC',
  gold: '#BD8648',
  surface: '#FFFFFF',
  ink: '#2E2E2A',
  muted: '#777771',
  line: '#EAE9E5',
  danger: '#B42318',
  dangerLight: '#FDECEC',
  success: '#16804A',
  successLight: '#EAF6EF',
  warning: '#A66A18',
  warningLight: '#FFF4DF',
  soft: '#F6F5F3',
};

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 5,
    lineHeight: 19,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  muted: {
    color: colors.muted,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14,
  },
});