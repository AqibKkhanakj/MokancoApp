import React from 'react';
import { View } from 'react-native';
import { Invoice } from '../types';
import { InvoiceRow } from './InvoiceRow';
import { EmptyState } from './EmptyState';

type Props = {
  invoices: Invoice[];
  onPay?: (invoice: Invoice) => void;
};

export const InvoiceList = ({ invoices, onPay }: Props) => {
  if (invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <View>
      {invoices.map(invoice => (
        <InvoiceRow key={invoice.id} invoice={invoice} onPay={onPay} />
      ))}
    </View>
  );
};