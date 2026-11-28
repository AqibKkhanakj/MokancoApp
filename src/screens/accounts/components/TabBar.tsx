import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TabKey } from '../types';
import { colors } from '../styles';

type Props = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const tabs: TabKey[] = ['Insights', 'Invoices', 'Reports'];

export const TabBar = ({ activeTab, onChange }: Props) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map(tab => {
          const active = activeTab === tab;

          return (
            <Pressable
              key={tab}
              onPress={() => onChange(tab)}
              style={[styles.tab, active && styles.activeTab]}
            >
              <Text style={[styles.label, active && styles.activeLabel]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    marginTop: 20,
    marginBottom: 18,
  },
  tab: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 9,
  },
  activeTab: {
    backgroundColor: colors.ink,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.surface,
  },
});