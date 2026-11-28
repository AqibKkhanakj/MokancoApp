import { useMemo, useState } from 'react';
import { Invoice } from '../types';
import { statusOf, paymentOf } from '../utils';

export const useInvoiceFilters = (invoices: Invoice[]) => {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('All time');
  const [status, setStatus] = useState('All');
  const [payment, setPayment] = useState('All');

  const filteredInvoices = useMemo(() => {
    const today = new Date();

    return invoices.filter(invoice => {
      const searchMatch =
        invoice.number.toLowerCase().includes(search.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(search.toLowerCase());

      const invoiceStatus = statusOf(invoice);
      const paymentStatus = paymentOf(invoice);

      const statusMatch =
        status === 'All' || invoiceStatus === status.toLowerCase();

      const paymentMatch =
        payment === 'All' || paymentStatus === payment.toLowerCase();

      let dateMatch = true;

      if (dateRange !== 'All time') {
        const days =
          dateRange === '30 days'
            ? 30
            : dateRange === '90 days'
              ? 90
              : 365;

        const cutoff = new Date(today);
        cutoff.setDate(today.getDate() - days);

        dateMatch = new Date(invoice.issuedAt) >= cutoff;
      }

      return searchMatch && statusMatch && paymentMatch && dateMatch;
    });
  }, [invoices, search, dateRange, status, payment]);

  const totals = useMemo(() => {
    const total = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const paid = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
    const outstanding = Math.max(0, total - paid);

    const overdue = invoices
      .filter(invoice => statusOf(invoice) === 'overdue')
      .reduce(
        (sum, invoice) => sum + Math.max(0, invoice.total - invoice.paid),
        0,
      );

    return {
      total,
      paid,
      outstanding,
      overdue,
      invoiceCount: invoices.length,
      paidCount: invoices.filter(
        invoice => statusOf(invoice) === 'paid',
      ).length,
      openCount: invoices.filter(
        invoice => statusOf(invoice) === 'open',
      ).length,
      overdueCount: invoices.filter(
        invoice => statusOf(invoice) === 'overdue',
      ).length,
    };
  }, [invoices]);

  return {
    search,
    setSearch,
    dateRange,
    setDateRange,
    status,
    setStatus,
    payment,
    setPayment,
    filteredInvoices,
    totals,
  };
};