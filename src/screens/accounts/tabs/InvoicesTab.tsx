import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarDays, Download, Filter } from 'lucide-react-native';

import { Invoice } from '../types';
import { DATE_RANGES, PAYMENT_OPTIONS, STATUS_OPTIONS } from '../constants';
import { useInvoiceFilters } from '../hooks/useInvoiceFilters';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { InvoiceList } from '../components/InvoiceList';
import { OptionSheet } from '../components/OptionSheet';
import { SectionCard } from '../components/SectionCard';
import { colors } from '../styles';
import { money } from '../utils';

type Props = {
  invoices: Invoice[];
  onPay: (invoice: Invoice) => void;
};

export const InvoicesTab = ({ invoices, onPay }: Props) => {
  const filters = useInvoiceFilters(invoices);
  const [sheet, setSheet] = useState<'date' | 'status' | 'payment' | null>(
    null,
  );

  const openSheet = (type: 'date' | 'status' | 'payment') => setSheet(type);

  const exportInvoices = () => {
    Alert.alert(
      'Export invoices',
      'Export functionality will be connected to your backend.',
    );
  };

  return (
    <View>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.heading}>All invoices</Text>
          <Text style={styles.subtitle}>
            Manage and track your invoices
          </Text>
        </View>

        <Pressable style={styles.exportButton} onPress={exportInvoices}>
          <Download size={15} color={colors.surface} />
          <Text style={styles.exportText}>Export</Text>
        </Pressable>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total outstanding</Text>
        <Text style={styles.totalAmount}>
          {money(filters.totals.outstanding)}
        </Text>
        <Text style={styles.totalDescription}>
          Across {filters.totals.invoiceCount} invoices
        </Text>
      </View>

      <SearchBar value={filters.search} onChange={filters.setSearch} />

      <View style={styles.filterHeading}>
        <Filter size={16} color={colors.ink} />
        <Text style={styles.filterTitle}>Filters</Text>
      </View>

      <View style={styles.filterButtons}>
        <Pressable
          style={styles.filterButton}
          onPress={() => openSheet('date')}
        >
          <CalendarDays size={15} color={colors.ink} />
          <Text style={styles.filterButtonText}>{filters.dateRange}</Text>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => openSheet('status')}
        >
          <Text style={styles.filterButtonText}>{filters.status} status</Text>
        </Pressable>

        <Pressable
          style={styles.filterButton}
          onPress={() => openSheet('payment')}
        >
          <Text style={styles.filterButtonText}>{filters.payment} payment</Text>
        </Pressable>
      </View>

      <SectionCard
        title="Invoices"
        subtitle={`${filters.filteredInvoices.length} results found`}
      >
        <InvoiceList
          invoices={filters.filteredInvoices}
          onPay={onPay}
        />
      </SectionCard>

      <OptionSheet
        visible={sheet === 'date'}
        title="Select date range"
        options={DATE_RANGES}
        selected={filters.dateRange}
        onSelect={filters.setDateRange}
        onClose={() => setSheet(null)}
      />

      <OptionSheet
        visible={sheet === 'status'}
        title="Select invoice status"
        options={STATUS_OPTIONS}
        selected={filters.status}
        onSelect={filters.setStatus}
        onClose={() => setSheet(null)}
      />

      <OptionSheet
        visible={sheet === 'payment'}
        title="Select payment status"
        options={PAYMENT_OPTIONS}
        selected={filters.payment}
        onSelect={filters.setPayment}
        onClose={() => setSheet(null)}
      />
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
  totalCard: {
    backgroundColor: colors.ink,
    borderRadius: 15,
    padding: 17,
    marginBottom: 15,
  },
  totalLabel: {
    color: '#D7D5CE',
    fontSize: 12,
  },
  totalAmount: {
    color: colors.surface,
    fontSize: 25,
    fontWeight: '700',
    marginTop: 7,
  },
  totalDescription: {
    color: '#D7D5CE',
    fontSize: 11,
    marginTop: 5,
  },
  filterHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  filterTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterButtonText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '600',
  },
});