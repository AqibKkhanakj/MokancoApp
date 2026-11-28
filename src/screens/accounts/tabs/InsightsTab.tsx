import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Wallet,
  TrendingUp,
  Clock,
  FileText,
  CheckCircle,
} from 'lucide-react-native';

import { Invoice } from '../types';
import { StatCard } from '../components/StatCard';
import { SectionCard } from '../components/SectionCard';
import { StatusBadge } from '../components/StatusBadge';
import { colors, styles } from '../styles';
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

export const InsightsTab = ({ invoices, totals }: Props) => {
  const statusItems = [
    {
      label: 'Paid',
      count: totals.paidCount,
      color: colors.success,
    },
    {
      label: 'Open',
      count: totals.openCount,
      color: colors.warning,
    },
    {
      label: 'Overdue',
      count: totals.overdueCount,
      color: colors.danger,
    },
  ];

  const maxCount = Math.max(totals.invoiceCount, 1);

  return (
    <View>
      <Text style={styles.sectionTitle}>Financial overview</Text>
      <Text style={styles.subtitle}>
        A quick overview of your invoice activity
      </Text>

      <View style={localStyles.grid}>
        <StatCard
          title="Total invoices"
          value={money(totals.total)}
          subtitle={`${totals.invoiceCount} invoices`}
          icon={FileText}
        />
        <StatCard
          title="Total paid"
          value={money(totals.paid)}
          subtitle="Payments received"
          icon={CheckCircle}
        />
        <StatCard
          title="Outstanding"
          value={money(totals.outstanding)}
          subtitle="Remaining balance"
          icon={Wallet}
        />
        <StatCard
          title="Overdue"
          value={money(totals.overdue)}
          subtitle={`${totals.overdueCount} overdue invoices`}
          icon={Clock}
        />
      </View>

      <SectionCard
        title="Invoice status"
        subtitle="Breakdown of your current invoices"
      >
        {statusItems.map(item => (
          <View key={item.label} style={localStyles.statusRow}>
            <View style={localStyles.statusInfo}>
              <View
                style={[
                  localStyles.dot,
                  { backgroundColor: item.color },
                ]}
              />
              <Text style={localStyles.statusLabel}>{item.label}</Text>
            </View>

            <Text style={localStyles.statusCount}>{item.count}</Text>

            <View style={localStyles.progressBackground}>
              <View
                style={[
                  localStyles.progress,
                  {
                    backgroundColor: item.color,
                    width: `${(item.count / maxCount) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </SectionCard>

      <SectionCard
        title="Recent invoices"
        subtitle="Your latest invoice activity"
      >
        {invoices.slice(0, 3).map(invoice => (
          <View key={invoice.id} style={localStyles.recentRow}>
            <View style={localStyles.recentInfo}>
              <Text style={localStyles.invoiceNumber}>{invoice.number}</Text>
              <Text style={localStyles.vendor}>{invoice.vendor}</Text>
            </View>

            <View style={localStyles.recentRight}>
              <Text style={localStyles.amount}>
                {money(remainingAmount(invoice))}
              </Text>
              <StatusBadge status={statusOf(invoice)} />
            </View>
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Payment summary">
        <View style={localStyles.summaryRow}>
          <TrendingUp size={19} color={colors.gold} />
          <Text style={localStyles.summaryText}>Payments received</Text>
          <Text style={localStyles.summaryAmount}>{money(totals.paid)}</Text>
        </View>
        <View style={localStyles.summaryRow}>
          <Wallet size={19} color={colors.gold} />
          <Text style={localStyles.summaryText}>Remaining balance</Text>
          <Text style={localStyles.summaryAmount}>
            {money(totals.outstanding)}
          </Text>
        </View>
      </SectionCard>
    </View>
  );
};

const localStyles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  statusRow: {
    marginBottom: 18,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusLabel: {
    color: colors.ink,
    fontSize: 12,
    flex: 1,
  },
  statusCount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  progressBackground: {
    height: 7,
    backgroundColor: colors.soft,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: 7,
    borderRadius: 10,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  recentInfo: {
    flex: 1,
  },
  invoiceNumber: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  vendor: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },
  recentRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  amount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  summaryText: {
    color: colors.ink,
    fontSize: 12,
    flex: 1,
  },
  summaryAmount: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '700',
  },
});