import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Download, FileText, TrendingDown, TrendingUp } from 'lucide-react-native';

import { Invoice } from '../types';
import { SectionCard } from '../components/SectionCard';
import { StatCard } from '../components/StatCard';
import { colors } from '../styles';
import { money, remainingAmount, statusOf } from '../utils';

type Props = {
  invoices: Invoice[];
  totals: {
    total: number;
    paid: number;
    outstanding: number;
    overdue: number;
    invoiceCount: number;
    paidCount: number;
    openCount: number;
    overdueCount: number;
  };
};

export const ReportsTab = ({ invoices, totals }: Props) => {
  const reportItems = [
    {
      title: 'Outstanding invoices',
      amount: totals.outstanding,
      description: 'Total remaining balance',
      icon: TrendingDown,
    },
    {
      title: 'Overdue payments',
      amount: totals.overdue,
      description: `${totals.overdueCount} overdue invoices`,
      icon: FileText,
    },
    {
      title: 'Payments received',
      amount: totals.paid,
      description: 'Total amount paid',
      icon: TrendingUp,
    },
  ];

  const exportReport = () => {
    Alert.alert(
      'Export report',
      'Report export will be connected to your backend.',
    );
  };

  const statusGroups = [
    {
      label: 'Paid',
      count: invoices.filter(invoice => statusOf(invoice) === 'paid').length,
      amount: invoices
        .filter(invoice => statusOf(invoice) === 'paid')
        .reduce((sum, invoice) => sum + invoice.paid, 0),
      color: colors.success,
    },
    {
      label: 'Open',
      count: invoices.filter(invoice => statusOf(invoice) === 'open').length,
      amount: invoices
        .filter(invoice => statusOf(invoice) === 'open')
        .reduce((sum, invoice) => sum + remainingAmount(invoice), 0),
      color: colors.warning,
    },
    {
      label: 'Overdue',
      count: invoices.filter(invoice => statusOf(invoice) === 'overdue').length,
      amount: invoices
        .filter(invoice => statusOf(invoice) === 'overdue')
        .reduce((sum, invoice) => sum + remainingAmount(invoice), 0),
      color: colors.danger,
    },
  ];

  return (
    <View>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.heading}>Financial reports</Text>
          <Text style={styles.subtitle}>
            Review your financial performance
          </Text>
        </View>

        <Pressable style={styles.exportButton} onPress={exportReport}>
          <Download size={15} color={colors.surface} />
          <Text style={styles.exportText}>Export</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {reportItems.map(item => (
          <StatCard
            key={item.title}
            title={item.title}
            value={money(item.amount)}
            subtitle={item.description}
            icon={item.icon}
          />
        ))}
      </View>

      <SectionCard
        title="Invoice breakdown"
        subtitle="Summary by invoice status"
      >
        {statusGroups.map(item => (
          <View key={item.label} style={styles.breakdownRow}>
            <View style={styles.breakdownTop}>
              <View style={styles.labelGroup}>
                <View
                  style={[styles.dot, { backgroundColor: item.color }]}
                />
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.count}>({item.count})</Text>
              </View>
              <Text style={styles.amount}>{money(item.amount)}</Text>
            </View>
          </View>
        ))}
      </SectionCard>

      <SectionCard
        title="Report summary"
        subtitle="Your current account position"
      >
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total invoice value</Text>
          <Text style={styles.summaryValue}>{money(totals.total)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Payments received</Text>
          <Text style={styles.summaryValue}>{money(totals.paid)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Outstanding balance</Text>
          <Text style={styles.dangerValue}>{money(totals.outstanding)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Overdue balance</Text>
          <Text style={styles.dangerValue}>{money(totals.overdue)}</Text>
        </View>
      </SectionCard>
    </View>
  );
};

const styles = StyleSheet.create({
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  heading: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
  exportButton: {
    backgroundColor: colors.ink,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exportText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  breakdownRow: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  breakdownTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 9,
  },
  label: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '600',
  },
  count: {
    color: colors.muted,
    fontSize: 11,
    marginLeft: 5,
  },
  amount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  summaryValue: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  dangerValue: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
  },
});