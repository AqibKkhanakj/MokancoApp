import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export const FilterChip = ({ label, active, onPress }: Props) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, active && styles.activeChip]}
  >
    <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
    marginRight: 7,
  },
  activeChip: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
  },
  activeLabel: {
    color: colors.surface,
  },
});