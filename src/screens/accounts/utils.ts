import { Invoice, InvoiceStatus, PaymentStatus } from './types';

export const money = (amount: number) =>
  `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const statusOf = (invoice: Invoice): InvoiceStatus => {
  if (invoice.paid >= invoice.total) return 'paid';

  const dueDate = new Date(invoice.dueAt);
  const today = new Date();

  if (dueDate < new Date(today.toDateString())) return 'overdue';

  return 'open';
};

export const paymentOf = (invoice: Invoice): PaymentStatus => {
  if (invoice.paid <= 0) return 'unpaid';
  if (invoice.paid >= invoice.total) return 'paid';
  return 'partial';
};

export const daysLate = (invoice: Invoice) => {
  if (statusOf(invoice) !== 'overdue') return 0;

  const due = new Date(invoice.dueAt);
  const today = new Date();

  return Math.max(
    0,
    Math.floor((today.getTime() - due.getTime()) / 86400000),
  );
};

export const remainingAmount = (invoice: Invoice) =>
  Math.max(0, invoice.total - invoice.paid);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });