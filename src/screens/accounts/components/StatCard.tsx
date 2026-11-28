import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '../styles';

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
};

export const StatCard = ({ title, value, subtitle, icon: Icon }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconBox}>
          <Icon size={18} color={colors.gold} />
        </View>
      </View>

      <Text style={styles.value}>{value}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F7F1E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 15,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 5,
  },
});