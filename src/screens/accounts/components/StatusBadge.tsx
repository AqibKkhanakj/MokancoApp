import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InvoiceStatus, PaymentStatus } from '../types';
import { colors } from '../styles';

type Props = {
  status: InvoiceStatus | PaymentStatus;
};

const config = {
  open: { label: 'Open', background: '#FFF4DF', color: '#A66A18' },
  overdue: { label: 'Overdue', background: '#FDECEC', color: '#B42318' },
  paid: { label: 'Paid', background: '#EAF6EF', color: '#16804A' },
  unpaid: { label: 'Unpaid', background: '#FDECEC', color: '#B42318' },
  partial: { label: 'Partial', background: '#FFF4DF', color: '#A66A18' },
};

export const StatusBadge = ({ status }: Props) => {
  const item = config[status];

  return (
    <View style={[styles.badge, { backgroundColor: item.background }]}>
      <Text style={[styles.text, { color: item.color }]}>{item.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
  },
});