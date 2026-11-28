import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FilterChip } from './FilterChip';
import { colors } from '../styles';

type Props = {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export const FilterBar = ({ title, options, selected, onChange }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map(option => (
        <FilterChip
          key={option}
          label={option}
          active={selected === option}
          onPress={() => onChange(option)}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 9,
  },
});