import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { TabBar } from './components/TabBar';

import { InsightsTab } from './tabs/InsightsTab';
import { InvoicesTab } from './tabs/InvoicesTab';
import { ReportsTab } from './tabs/ReportsTab';

import { Invoice, TabKey } from './types';
import { SAMPLE_INVOICES } from './constants';
import { money } from './utils';

export const AccountsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Insights');

  const [invoices, setInvoices] = useState<Invoice[]>(SAMPLE_INVOICES);

  const totals = useMemo(() => {
    const total = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    );

    const paid = invoices.reduce(
      (sum, invoice) => sum + invoice.paid,
      0,
    );

    const outstanding = Math.max(0, total - paid);

    const today = new Date();

    const overdueInvoices = invoices.filter(invoice => {
      const due = new Date(invoice.dueAt);
      return invoice.paid < invoice.total && due < new Date(today.toDateString());
    });

    const overdue = overdueInvoices.reduce(
      (sum, invoice) => sum + Math.max(0, invoice.total - invoice.paid),
      0,
    );

    const paidCount = invoices.filter(
      invoice => invoice.paid >= invoice.total,
    ).length;

    const overdueCount = overdueInvoices.length;

    const openCount = invoices.filter(invoice => {
      const due = new Date(invoice.dueAt);
      return (
        invoice.paid < invoice.total &&
        due >= new Date(today.toDateString())
      );
    }).length;

    return {
      total,
      paid,
      outstanding,
      overdue,
      invoiceCount: invoices.length,
      paidCount,
      openCount,
      overdueCount,
    };
  }, [invoices]);

  const handlePay = (invoice: Invoice) => {
    Alert.alert(
      'Pay invoice',
      `Do you want to continue with payment of ${money(
        Math.max(0, invoice.total - invoice.paid),
      )} for ${invoice.number}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            Alert.alert(
              'Payment',
              'Payment gateway integration will be added here.',
            );
          },
        },
      ],
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'Insights':
        return <InsightsTab invoices={invoices} totals={totals} />;

      case 'Invoices':
        return <InvoicesTab invoices={invoices} onPay={handlePay} />;

      case 'Reports':
        return <ReportsTab invoices={invoices} totals={totals} />;

      default:
        return null;
    }
  };

  return (
    <Screen>
      <View style={styles.screen}>
        <WorkspaceHeader />
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text className="text-2xl font-semibold text-ink">Accounts</Text>
            <Text className="mt-1 text-sm leading-5 text-line">
              Manage invoices, payments and financial reports.
            </Text>
          </View>

          <TabBar activeTab={activeTab} onChange={setActiveTab} />

          {renderTab()}
        </ScrollView>

        <FooterMenu current="Accounts" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
});