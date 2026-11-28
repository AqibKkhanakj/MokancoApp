import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';
import { Invoice } from '../types';
import { colors } from '../styles';
import { formatDate, money, paymentOf, remainingAmount, statusOf } from '../utils';
import { StatusBadge } from './StatusBadge';

type Props = {
  invoice: Invoice;
  onPay?: (invoice: Invoice) => void;
};

export const InvoiceRow = ({ invoice, onPay }: Props) => {
  const status = statusOf(invoice);
  const payment = paymentOf(invoice);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Text style={styles.number}>{invoice.number}</Text>
          <Text style={styles.vendor}>{invoice.vendor}</Text>
        </View>
        <StatusBadge status={status} />
      </View>

      <View style={styles.details}>
        <View>
          <Text style={styles.caption}>Due date</Text>
          <Text style={styles.detail}>{formatDate(invoice.dueAt)}</Text>
        </View>
        <View>
          <Text style={styles.caption}>Total</Text>
          <Text style={styles.detail}>{money(invoice.total)}</Text>
        </View>
        <View>
          <Text style={styles.caption}>Remaining</Text>
          <Text style={styles.remaining}>{money(remainingAmount(invoice))}</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <StatusBadge status={payment} />
        {remainingAmount(invoice) > 0 && onPay ? (
          <Pressable style={styles.payButton} onPress={() => onPay(invoice)}>
            <Text style={styles.payText}>Pay now</Text>
            <ArrowUpRight size={14} color={colors.surface} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  number: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  vendor: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  caption: {
    color: colors.muted,
    fontSize: 10,
    marginBottom: 5,
  },
  detail: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '600',
  },
  remaining: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '700',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  payButton: {
    backgroundColor: colors.ink,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  payText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
});