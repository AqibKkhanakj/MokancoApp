import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FileSearch } from 'lucide-react-native';
import { colors } from '../styles';

type Props = {
  title?: string;
  description?: string;
};

export const EmptyState = ({
  title = 'No invoices found',
  description = 'Try changing your search or filters.',
}: Props) => (
  <View style={styles.container}>
    <View style={styles.icon}>
      <FileSearch size={25} color={colors.gold} />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#F7F1E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.ink,
  },
  description: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});