import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '../styles';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: Props) => (
  <View style={styles.container}>
    <Search size={18} color={colors.muted} />
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder="Search invoices or vendors..."
      placeholderTextColor={colors.muted}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.ink,
    fontSize: 13,
  },
});