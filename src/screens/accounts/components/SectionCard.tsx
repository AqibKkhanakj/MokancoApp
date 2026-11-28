import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const SectionCard = ({ title, subtitle, children }: Props) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  title: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
  content: {
    marginTop: 16,
  },
});