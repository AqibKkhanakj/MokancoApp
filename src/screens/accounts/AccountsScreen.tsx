import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  AlarmClock,
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileText,
  Inbox,
  Printer,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';

import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { AppButton } from '../../components/AppButton';
import { colors } from '../../theme/palette';

/* -------------------------------------------------------------------------- */
/* Types + helpers                                                            */
/* -------------------------------------------------------------------------- */

export type Invoice = {
  id: string;
  number: string;
  vendor: string;
  issuedAt: string; // ISO date
  dueAt: string; // ISO date
  total: number;
  paid: number;
};

type InvoiceStatus = 'open' | 'overdue' | 'paid';
type PaymentStatus = 'unpaid' | 'partial' | 'paid';
type TabKey = 'Insights' | 'Invoices' | 'Reports';

type Option<T extends string> = { value: T; label: string };

const DATE_RANGES = [
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 3 months' },
  { value: '365', label: 'Last 12 months' },
  { value: 'all', label: 'All time' },
] as const satisfies readonly Option<string>[];

const STATUS_OPTIONS: Option<'all' | InvoiceStatus>[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'paid', label: 'Paid' },
];

const PAYMENT_OPTIONS: Option<'any' | PaymentStatus>[] = [
  { value: 'any', label: 'Any payment status' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partial', label: 'Partially paid' },
  { value: 'paid', label: 'Paid in full' },
];

const REPORT_TYPES = [
  {
    key: 'owed',
    title: 'Invoices owed',
    detail: 'Everything billed to you in range',
    icon: FileText,
  },
  {
    key: 'overdue',
    title: 'Overdue invoices',
    detail: 'Bills past due with days late and any late fees',
    icon: AlarmClock,
  },
  {
    key: 'payments',
    title: 'Payments made',
    detail: 'Payments you sent, by invoice',
    icon: CircleDollarSign,
  },
] as const;

const STATUS_COLORS: Record<InvoiceStatus, { bg: string; fg: string; label: string }> = {
  open: { bg: '#E8F1FB', fg: '#1F5E99', label: 'Open' },
  overdue: { bg: '#FBE9EA', fg: '#B3202F', label: 'Overdue' },
  paid: { bg: '#E3F5EA', fg: '#1E7A4C', label: 'Paid' },
};

const money = (n: number) =>
  `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

const statusOf = (inv: Invoice): InvoiceStatus => {
  if (inv.paid >= inv.total) return 'paid';
  return new Date(inv.dueAt).getTime() < Date.now() ? 'overdue' : 'open';
};

const paymentOf = (inv: Invoice): PaymentStatus =>
  inv.paid >= inv.total ? 'paid' : inv.paid > 0 ? 'partial' : 'unpaid';

const daysLate = (inv: Invoice) =>
  Math.max(0, Math.floor((Date.now() - new Date(inv.dueAt).getTime()) / 86_400_000));

/* -------------------------------------------------------------------------- */
/* Small reusable components (move to /components when you're happy)          */
/* -------------------------------------------------------------------------- */

function TabBar({
  current,
  onChange,
}: {
  current: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; icon: typeof BarChart3 }[] = [
    { key: 'Insights', icon: BarChart3 },
    { key: 'Invoices', icon: FileText },
    { key: 'Reports', icon: ClipboardIcon },
  ];

  return (
    <View className="flex-row rounded-2xl bg-surface p-1.5" style={styles.card}>
      {tabs.map(({ key, icon: Icon }) => {
        const active = key === current;
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(key)}
            className="flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5"
            style={active ? { backgroundColor: colors.ink } : undefined}
          >
            <Icon
              size={15}
              strokeWidth={1.75}
              color={active ? colors.surface : '#6B7280'}
            />
            <Text
              className="text-sm font-semibold"
              style={{ color: active ? colors.surface : '#6B7280' }}
            >
              {key}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
// Reports tab icon (alias so the tabs array above stays readable)
const ClipboardIcon = FileText;

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  tint,
  bg,
}: {
  label: string;
  value: string;
  caption?: string;
  icon: typeof Wallet;
  tint: string;
  bg: string;
}) {
  return (
    <View
      className="rounded-2xl bg-surface p-4"
      style={[styles.card, { width: '48.5%' }]}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="text-[11px] font-semibold tracking-[1px] text-line">
            {label}
          </Text>
          {caption ? (
            <Text className="mt-0.5 text-[11px] text-line">{caption}</Text>
          ) : null}
        </View>
        <View
          className="h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: bg }}
        >
          <Icon size={17} color={tint} strokeWidth={1.75} />
        </View>
      </View>
      <Text className="mt-3 text-2xl font-semibold" style={{ color: tint }}>
        {value}
      </Text>
    </View>
  );
}

function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <View className="mt-4 flex-row flex-wrap justify-between" style={{ rowGap: 12 }}>
      {children}
    </View>
  );
}

function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-5 rounded-2xl bg-surface" style={styles.card}>
      <View className="flex-row items-start justify-between p-4">
        <View className="flex-1 pr-3">
          <Text className="text-base font-semibold text-ink">{title}</Text>
          {subtitle ? (
            <Text className="mt-1 text-sm leading-5 text-line">{subtitle}</Text>
          ) : null}
        </View>
        {action}
      </View>
      <View style={styles.divider} />
      <View className="p-4">{children}</View>
    </View>
  );
}

function EmptyState({
  title,
  detail,
  icon: Icon = Inbox,
}: {
  title: string;
  detail: string;
  icon?: typeof Inbox;
}) {
  return (
    <View className="items-center px-4 py-8">
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-canvas">
        <Icon size={22} color="#6B7280" strokeWidth={1.5} />
      </View>
      <Text className="mt-4 text-base font-semibold text-ink">{title}</Text>
      <Text className="mt-1 text-center text-sm leading-5 text-line">{detail}</Text>
    </View>
  );
}

function SearchBar({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
}) {
  return (
    <View
      className="flex-row items-center gap-2 rounded-xl bg-surface px-3"
      style={styles.input}
    >
      <Search size={16} color="#6B7280" strokeWidth={1.75} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 py-2.5 text-sm text-ink"
        autoCorrect={false}
      />
    </View>
  );
}

function FilterChip({
  label,
  icon: Icon,
  onPress,
}: {
  label: string;
  icon?: typeof Calendar;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-1.5 rounded-xl bg-surface px-3 py-2.5"
      style={styles.input}
    >
      {Icon ? <Icon size={14} color="#6B7280" strokeWidth={1.75} /> : null}
      <Text className="text-sm text-ink">{label}</Text>
      <ChevronDown size={14} color="#6B7280" strokeWidth={1.75} />
    </Pressable>
  );
}

function OptionSheet<T extends string>({
  visible,
  title,
  options,
  value,
  onSelect,
  onClose,
}: {
  visible: boolean;
  title: string;
  options: readonly Option<T>[];
  value: T;
  onSelect: (v: T) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable className="rounded-t-3xl bg-surface p-5" onPress={() => {}}>
          <Text className="mb-2 text-base font-semibold text-ink">{title}</Text>
          {options.map((o) => (
            <Pressable
              key={o.value}
              onPress={() => {
                onSelect(o.value);
                onClose();
              }}
              className="flex-row items-center justify-between py-3"
            >
              <Text className="text-sm text-ink">{o.label}</Text>
              {o.value === value ? (
                <Check size={16} color={colors.gold} strokeWidth={2} />
              ) : null}
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const s = STATUS_COLORS[status];
  return (
    <View className="rounded-full px-2.5 py-1" style={{ backgroundColor: s.bg }}>
      <Text className="text-[11px] font-semibold" style={{ color: s.fg }}>
        {s.label}
      </Text>
    </View>
  );
}

function InvoiceRow({
  invoice,
  onPay,
}: {
  invoice: Invoice;
  onPay?: (inv: Invoice) => void;
}) {
  const status = statusOf(invoice);
  const balance = invoice.total - invoice.paid;

  return (
    <View className="rounded-xl bg-canvas p-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-ink">#{invoice.number}</Text>
        <StatusBadge status={status} />
      </View>
      <Text className="mt-0.5 text-xs text-line">{invoice.vendor}</Text>

      <View className="mt-3 flex-row justify-between">
        <View>
          <Text className="text-[10px] tracking-[1px] text-line">DUE</Text>
          <Text className="text-sm text-ink">
            {new Date(invoice.dueAt).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text className="text-[10px] tracking-[1px] text-line">TOTAL</Text>
          <Text className="text-sm text-ink">{money(invoice.total)}</Text>
        </View>
        <View>
          <Text className="text-[10px] tracking-[1px] text-line">BALANCE</Text>
          <Text className="text-sm font-semibold text-ink">{money(balance)}</Text>
        </View>
      </View>

      {balance > 0 && onPay ? (
        <AppButton
          title="Pay now"
          onPress={() => onPay(invoice)}
          className="mt-3 self-end"
        />
      ) : null}
    </View>
  );
}

function InvoiceList({
  invoices,
  onPay,
  emptyTitle,
  emptyDetail,
}: {
  invoices: Invoice[];
  onPay?: (inv: Invoice) => void;
  emptyTitle: string;
  emptyDetail: string;
}) {
  if (invoices.length === 0) {
    return <EmptyState title={emptyTitle} detail={emptyDetail} />;
  }
  return (
    <View className="gap-3">
      {invoices.map((inv) => (
        <InvoiceRow key={inv.id} invoice={inv} onPay={onPay} />
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Filtering hook shared by Invoices + Reports                                */
/* -------------------------------------------------------------------------- */

function useInvoiceFilters(invoices: Invoice[]) {
  const [range, setRange] = useState<string>('365');
  const [status, setStatus] = useState<'all' | InvoiceStatus>('all');
  const [payment, setPayment] = useState<'any' | PaymentStatus>('any');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const cutoff =
      range === 'all' ? 0 : Date.now() - Number(range) * 86_400_000;
    const q = query.trim().toLowerCase();

    return invoices.filter((inv) => {
      if (new Date(inv.issuedAt).getTime() < cutoff) return false;
      if (status !== 'all' && statusOf(inv) !== status) return false;
      if (payment !== 'any' && paymentOf(inv) !== payment) return false;
      if (q && !`${inv.number} ${inv.vendor}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [invoices, range, status, payment, query]);

  const totals = useMemo(() => {
    const billed = filtered.reduce((s, i) => s + i.total, 0);
    const paid = filtered.reduce((s, i) => s + i.paid, 0);
    const overdue = filtered
      .filter((i) => statusOf(i) === 'overdue')
      .reduce((s, i) => s + (i.total - i.paid), 0);
    return { billed, paid, stillToPay: billed - paid, overdue };
  }, [filtered]);

  return {
    range, setRange, status, setStatus, payment, setPayment,
    query, setQuery, filtered, totals,
  };
}

function FilterBar({ f }: { f: ReturnType<typeof useInvoiceFilters> }) {
  const [open, setOpen] = useState<null | 'range' | 'status' | 'payment'>(null);
  const label = <T extends string>(opts: readonly Option<T>[], v: T) =>
    opts.find((o) => o.value === v)?.label ?? '';

  return (
    <View className="mt-4 rounded-2xl bg-surface p-3" style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          <FilterChip icon={Calendar} label={label(DATE_RANGES, f.range)} onPress={() => setOpen('range')} />
          <FilterChip label={label(STATUS_OPTIONS, f.status)} onPress={() => setOpen('status')} />
          <FilterChip label={label(PAYMENT_OPTIONS, f.payment)} onPress={() => setOpen('payment')} />
        </View>
      </ScrollView>

      <View className="mt-3">
        <SearchBar
          value={f.query}
          onChangeText={f.setQuery}
          placeholder="Search invoices, vendors, references..."
        />
      </View>

      <OptionSheet visible={open === 'range'} title="Date range" options={DATE_RANGES} value={f.range} onSelect={f.setRange} onClose={() => setOpen(null)} />
      <OptionSheet visible={open === 'status'} title="Status" options={STATUS_OPTIONS} value={f.status} onSelect={f.setStatus} onClose={() => setOpen(null)} />
      <OptionSheet visible={open === 'payment'} title="Payment status" options={PAYMENT_OPTIONS} value={f.payment} onSelect={f.setPayment} onClose={() => setOpen(null)} />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Tab content                                                                */
/* -------------------------------------------------------------------------- */

function InsightsTab({
  invoices,
  onSeeAll,
  onPay,
}: {
  invoices: Invoice[];
  onSeeAll: () => void;
  onPay: (inv: Invoice) => void;
}) {
  const [query, setQuery] = useState('');
  const total = invoices.reduce((s, i) => s + i.total, 0);
  const paid = invoices.reduce((s, i) => s + i.paid, 0);
  const overdue = invoices
    .filter((i) => statusOf(i) === 'overdue')
    .reduce((s, i) => s + (i.total - i.paid), 0);

  const recent = [...invoices]
    .sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt))
    .filter((i) => `${i.number} ${i.vendor}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <>
      <Text className="mt-5 text-lg font-semibold text-ink">Welcome, Test1</Text>
      <Text className="mt-1 text-sm leading-5 text-line">
        Payable insights for your location — amounts due, paid, and overdue.
      </Text>

      <StatGrid>
        <StatCard label="TOTAL INVOICES" value={String(invoices.length)} icon={FileText} tint="#1F4E79" bg="#E3F0FB" />
        <StatCard label="AMOUNT TO PAY" value={money(total - paid)} icon={Wallet} tint={colors.ink} bg="#EDE7FB" />
        <StatCard label="PAID" value={money(paid)} icon={CircleDollarSign} tint={colors.ink} bg="#DDF5E6" />
        <StatCard label="OVERDUE" value={money(overdue)} icon={AlertTriangle} tint="#B3202F" bg="#FBE9EA" />
      </StatGrid>

      <SectionCard
        title="Recent invoices"
        subtitle="Open Pay now to view Zelle instructions on the secure invoice page"
        action={
          <Pressable onPress={onSeeAll} className="rounded-xl px-3 py-2" style={styles.input}>
            <Text className="text-xs font-semibold text-ink">All invoices</Text>
          </Pressable>
        }
      >
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search..." />
        <View className="mt-3">
          <InvoiceList
            invoices={recent}
            onPay={onPay}
            emptyTitle="No invoices yet"
            emptyDetail="When invoices are sent to your location, they appear here."
          />
        </View>
      </SectionCard>
    </>
  );
}

function InvoicesTab({
  invoices,
  onPay,
  onExport,
}: {
  invoices: Invoice[];
  onPay: (inv: Invoice) => void;
  onExport: () => void;
}) {
  const f = useInvoiceFilters(invoices);

  return (
    <>
      <FilterBar f={f} />

      <StatGrid>
        <StatCard label="TOTAL INVOICED" caption={`${f.filtered.length} in view`} value={money(f.totals.billed)} icon={FileText} tint="#1F4E79" bg="#E3F0FB" />
        <StatCard label="OUTSTANDING" value={money(f.totals.stillToPay)} icon={Wallet} tint={colors.ink} bg="#EDE7FB" />
        <StatCard label="OVERDUE" value={money(f.totals.overdue)} icon={AlertTriangle} tint="#B3202F" bg="#FBE9EA" />
        <StatCard label="PAID" value={money(f.totals.paid)} icon={CircleDollarSign} tint={colors.ink} bg="#DDF5E6" />
      </StatGrid>

      <SectionCard
        title="Invoices"
        subtitle="Create, send, and manage partner invoices"
        action={
          <Pressable
            onPress={onExport}
            disabled={f.filtered.length === 0}
            className="flex-row items-center gap-1.5 rounded-xl px-3 py-2"
            style={[styles.input, f.filtered.length === 0 && { opacity: 0.45 }]}
          >
            <Download size={14} color={colors.ink} strokeWidth={1.75} />
            <Text className="text-xs font-semibold text-ink">Export</Text>
          </Pressable>
        }
      >
        <InvoiceList
          invoices={f.filtered}
          onPay={onPay}
          emptyTitle="No invoices in this range"
          emptyDetail="Adjust filters or create a new invoice to get started."
        />
      </SectionCard>
    </>
  );
}

function ReportsTab({ invoices }: { invoices: Invoice[] }) {
  const [reportKey, setReportKey] =
    useState<(typeof REPORT_TYPES)[number]['key']>('owed');
  const f = useInvoiceFilters(invoices);

  const rows = useMemo(() => {
    if (reportKey === 'overdue') return f.filtered.filter((i) => statusOf(i) === 'overdue');
    if (reportKey === 'payments') return f.filtered.filter((i) => i.paid > 0);
    return f.filtered;
  }, [f.filtered, reportKey]);

  const byStatus = (['open', 'overdue', 'paid'] as InvoiceStatus[]).map((s) => ({
    status: s,
    count: f.filtered.filter((i) => statusOf(i) === s).length,
  }));
  const maxCount = Math.max(1, ...byStatus.map((b) => b.count));
  const activeReport = REPORT_TYPES.find((r) => r.key === reportKey)!;

  return (
    <>
      {/* Report type picker */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
        <View className="flex-row gap-3">
          {REPORT_TYPES.map((r) => {
            const active = r.key === reportKey;
            const Icon = r.icon;
            return (
              <Pressable
                key={r.key}
                onPress={() => setReportKey(r.key)}
                className="w-56 flex-row items-start gap-3 rounded-2xl bg-surface p-3"
                style={[styles.card, active && { borderColor: colors.gold, borderWidth: 1.5 }]}
              >
                <Icon size={18} color={r.key === 'overdue' ? '#B3202F' : colors.ink} strokeWidth={1.75} />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-ink">{r.title}</Text>
                  <Text className="mt-0.5 text-xs leading-4 text-line">{r.detail}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <FilterBar f={f} />

      {/* Export row */}
      <View className="mt-3 flex-row gap-2">
        {[
          { label: 'CSV', icon: FileText },
          { label: 'Excel', icon: FileText },
          { label: 'Print / PDF', icon: Printer },
        ].map(({ label, icon: Icon }) => (
          <Pressable
            key={label}
            // TODO: wire to your export / share handler
            className="flex-row items-center gap-1.5 rounded-xl bg-surface px-3 py-2"
            style={styles.input}
          >
            <Icon size={13} color="#6B7280" strokeWidth={1.75} />
            <Text className="text-xs text-line">{label}</Text>
          </Pressable>
        ))}
      </View>

      <StatGrid>
        <StatCard label="INVOICES" value={String(f.filtered.length)} caption="Last 12 months" icon={FileText} tint="#2E2A7A" bg="#E4E3FB" />
        <StatCard label="BILLED TO YOU" value={money(f.totals.billed)} icon={TrendingUp} tint="#1F4E79" bg="#E3F0FB" />
        <StatCard label="PAID" value={money(f.totals.paid)} icon={CircleDollarSign} tint={colors.ink} bg="#DDF5E6" />
        <StatCard label="STILL TO PAY" value={money(f.totals.stillToPay)} icon={Wallet} tint="#7A3B10" bg="#FDF0CF" />
      </StatGrid>

      <SectionCard title="Invoices by status" subtitle="Invoices owed">
        {f.filtered.length === 0 ? (
          <EmptyState title="No data in this range" detail="Nothing to break down yet." />
        ) : (
          <View className="gap-3">
            {byStatus.map((b) => (
              <View key={b.status}>
                <View className="mb-1 flex-row justify-between">
                  <Text className="text-xs text-ink">{STATUS_COLORS[b.status].label}</Text>
                  <Text className="text-xs text-line">{b.count}</Text>
                </View>
                <View className="h-2 overflow-hidden rounded-full bg-canvas">
                  <View
                    style={{
                      width: `${(b.count / maxCount) * 100}%`,
                      height: '100%',
                      backgroundColor: STATUS_COLORS[b.status].fg,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </SectionCard>

      <SectionCard
        title={`${activeReport.title} detail`}
        subtitle={`${rows.length} rows`}
      >
        {rows.length === 0 ? (
          <EmptyState
            title="No rows for these filters"
            detail="Widen the date range or clear a filter to see results."
          />
        ) : (
          <View className="gap-3">
            {rows.map((inv) => (
              <View key={inv.id} className="rounded-xl bg-canvas p-3">
                <View className="flex-row justify-between">
                  <Text className="text-sm font-semibold text-ink">#{inv.number}</Text>
                  <StatusBadge status={statusOf(inv)} />
                </View>
                <Text className="mt-0.5 text-xs text-line">{inv.vendor}</Text>
                <View className="mt-2 flex-row justify-between">
                  <Text className="text-xs text-line">Billed {money(inv.total)}</Text>
                  <Text className="text-xs text-line">Paid {money(inv.paid)}</Text>
                  {reportKey === 'overdue' ? (
                    <Text className="text-xs font-semibold" style={{ color: '#B3202F' }}>
                      {daysLate(inv)}d late
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        )}
      </SectionCard>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Screen                                                                     */
/* -------------------------------------------------------------------------- */

export function AccountsScreen({
  invoices = [],
}: {
  // TODO: replace with data from your API / React Query hook
  invoices?: Invoice[];
}) {
  const [tab, setTab] = useState<TabKey>('Insights');

  const handlePay = (inv: Invoice) => {
    // TODO: navigate to the secure invoice page / Zelle instructions
    // navigation.navigate('InvoicePay', { id: inv.id });
  };

  const handleExport = () => {
    // TODO: build CSV and open Share sheet
  };

  return (
    <Screen>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Workspace header (same as Home) */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-ink">Workspace</Text>
              <Text className="text-xs text-line">Test 1</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Bell color={colors.ink} size={18} strokeWidth={1.75} />
              <View className="h-6 w-6 items-center justify-center rounded-full bg-gold">
                <Text className="text-[11px] font-semibold leading-none text-surface">T</Text>
              </View>
              <View>
                <Text className="text-[11px] font-semibold leading-3 text-ink">Test1</Text>
                <Text className="text-[10px] leading-3 text-line">Partner</Text>
              </View>
              <ChevronDown color={colors.ink} size={14} strokeWidth={1.75} />
            </View>
          </View>

          {/* Page heading */}
          <Text className="mt-5 text-2xl font-semibold text-ink">Accounts</Text>
          <Text className="mt-1 text-sm leading-5 text-line">
            {tab === 'Insights' && 'What you owe, what’s paid, and what’s overdue'}
            {tab === 'Invoices' && 'Bills sent to you — pay in full or partially'}
            {tab === 'Reports' && 'Payable view — amounts billed to you and payments you made'}
          </Text>

          <View className="mt-4">
            <TabBar current={tab} onChange={setTab} />
          </View>

          {tab === 'Insights' && (
            <InsightsTab invoices={invoices} onSeeAll={() => setTab('Invoices')} onPay={handlePay} />
          )}
          {tab === 'Invoices' && (
            <InvoicesTab invoices={invoices} onPay={handlePay} onExport={handleExport} />
          )}
          {tab === 'Reports' && <ReportsTab invoices={invoices} />}
        </ScrollView>

        <FooterMenu current="Accounts" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E1DA',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEDE8',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});