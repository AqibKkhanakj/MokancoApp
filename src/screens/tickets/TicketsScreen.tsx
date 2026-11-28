import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ArrowDown, ArrowUp, ChevronDown, Plus, Search } from 'lucide-react-native';
import { AppButton } from '../../components/AppButton';
import { CreateTicketModal } from '../../components/CreateTicketModal';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { colors } from '../../theme/palette';

const statuses = ['All statuses', 'In queue', 'In progress', 'Completed', 'Cancelled'] as const;
const sorts = ['Updated', 'Created', 'Progress', 'Title', 'Status', 'Ticket ID'] as const;
const columns = ['Ticket ID', 'Title', 'Deadline', 'Created', 'Assigned'] as const;

const tickets = [
  { id: 'T-1042', title: 'Printer offline', category: 'Device / Hardware', status: 'In progress', deadline: 'Nov 28', created: 'Nov 20', updated: '2026-11-25', createdOn: '2026-11-20', progress: 60, assigned: 'Sam' },
  { id: 'T-1038', title: 'Menu price update', category: 'Menu / Item updates', status: 'In queue', deadline: 'Dec 2', created: 'Nov 22', updated: '2026-11-24', createdOn: '2026-11-22', progress: 10, assigned: 'Nora' },
  { id: 'T-1031', title: 'Card reader decline', category: 'Payment / Transaction', status: 'Completed', deadline: 'Nov 18', created: 'Nov 10', updated: '2026-11-18', createdOn: '2026-11-10', progress: 100, assigned: 'Sam' },
  { id: 'T-1024', title: 'Delivery sync stopped', category: 'Delivery integration', status: 'Cancelled', deadline: 'Nov 15', created: 'Nov 8', updated: '2026-11-16', createdOn: '2026-11-08', progress: 25, assigned: 'Leah' },
  { id: 'T-1019', title: 'Drive access request', category: 'Google', status: 'In queue', deadline: 'Dec 5', created: 'Nov 21', updated: '2026-11-21', createdOn: '2026-11-21', progress: 0, assigned: 'Nora' },
  { id: 'T-1012', title: 'KDS ticket delay', category: 'Toast', status: 'In progress', deadline: 'Nov 30', created: 'Nov 12', updated: '2026-11-23', createdOn: '2026-11-12', progress: 45, assigned: 'Omar' },
  { id: 'T-1007', title: 'Network drop at counter', category: 'IT / Web', status: 'Completed', deadline: 'Nov 9', created: 'Nov 2', updated: '2026-11-09', createdOn: '2026-11-02', progress: 100, assigned: 'Leah' },
  { id: 'T-1002', title: 'Store hours change', category: 'Appfront', status: 'Cancelled', deadline: 'Nov 6', created: 'Nov 1', updated: '2026-11-06', createdOn: '2026-11-01', progress: 15, assigned: 'Omar' },
] as const;

type Ticket = (typeof tickets)[number];

export function TicketsScreen() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof statuses)[number]>('All statuses');
  const [sort, setSort] = useState<(typeof sorts)[number]>('Updated');
  const [descending, setDescending] = useState(true);
  const [openMenu, setOpenMenu] = useState<'status' | 'sort' | null>(null);
  const [creating, setCreating] = useState(false);

  const visibleTickets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = tickets.filter(ticket => {
      const matchesStatus = status === 'All statuses' || ticket.status === status;
      const matchesQuery =
        needle.length === 0 ||
        ticket.title.toLowerCase().includes(needle) ||
        ticket.id.toLowerCase().includes(needle) ||
        ticket.category.toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
    const direction = descending ? -1 : 1;
    return [...matched].sort((left, right) => direction * compareTickets(left, right, sort));
  }, [query, status, sort, descending]);

  const count = visibleTickets.length;
  const showing = count === 0 ? 'Showing 0-0 of 0' : `Showing 1-${count} of ${count}`;

  return (
    <Screen>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-2xl font-semibold text-ink">Ticket history</Text>
              <Text className="mt-1 text-sm leading-5 text-line">
                Tickets you opened for your location—open, in progress, and completed.
              </Text>
            </View>
          </View>
          <AppButton
            title="New ticket"
            onPress={() => setCreating(true)}
            icon={
              <Plus
                color={colors.canvas}
                size={16}
                strokeWidth={2}
              />
            }
            className="mt-4 self-end"
          />
          <View className="mt-4 rounded-2xl bg-surface p-3" style={styles.card}>
            <View className="flex-row items-center rounded-full border border-line px-3">
              <Search color={colors.line} size={16} strokeWidth={1.75} />
              <TextInput
                className="ml-2 h-10 flex-1 text-sm text-ink"
                placeholder="Search title, ID, category..."
                placeholderTextColor={colors.line}
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mt-3 flex-row flex-wrap gap-2">
              <FilterButton
                label={status}
                open={openMenu === 'status'}
                onPress={() => setOpenMenu(current => (current === 'status' ? null : 'status'))}
              />
              <FilterButton
                label={`Sort: ${sort}`}
                open={openMenu === 'sort'}
                onPress={() => setOpenMenu(current => (current === 'sort' ? null : 'sort'))}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={descending ? 'Descending' : 'Ascending'}
                className="flex-row items-center gap-1 rounded-xl border border-line px-3 py-2"
                onPress={() => setDescending(current => !current)}
              >
                <ArrowUp color={descending ? colors.line : colors.gold} size={14} strokeWidth={1.75} />
                <ArrowDown color={descending ? colors.gold : colors.line} size={14} strokeWidth={1.75} />
              </Pressable>
            </View>

            {openMenu === 'status' ? (
              <OptionList
                options={statuses}
                selected={status}
                onSelect={value => {
                  setStatus(value);
                  setOpenMenu(null);
                }}
              />
            ) : null}
            {openMenu === 'sort' ? (
              <OptionList
                options={sorts}
                selected={sort}
                label={value => `Sort: ${value}`}
                onSelect={value => {
                  setSort(value);
                  setOpenMenu(null);
                }}
              />
            ) : null}

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
              <View style={styles.table}>
                <View className="flex-row border-b border-canvas bg-canvas px-2 py-2">
                  {columns.map(column => (
                    <Text key={column} className="text-[11px] font-semibold uppercase tracking-[0.5px] text-line" style={styles.column}>
                      {column}
                    </Text>
                  ))}
                </View>
                {visibleTickets.length === 0 ? (
                  <View className="items-center justify-center px-4 py-16">
                    <Text className="text-sm text-line">No tickets found.</Text>
                  </View>
                ) : (
                  visibleTickets.map(ticket => (
                    <View key={ticket.id} className="flex-row items-center border-b border-canvas px-2 py-3">
                      <Text className="text-sm text-ink" style={styles.column}>{ticket.id}</Text>
                      <Text className="text-sm text-ink" style={styles.column}>{ticket.title}</Text>
                      <Text className="text-sm text-ink" style={styles.column}>{ticket.deadline}</Text>
                      <Text className="text-sm text-ink" style={styles.column}>{ticket.created}</Text>
                      <Text className="text-sm text-ink" style={styles.column}>{ticket.assigned}</Text>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>

            <View className="mt-2 flex-row items-center justify-between border-t border-canvas pt-3">
              <Text className="text-xs text-line">{showing}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-xs text-line">Prev</Text>
                <Text className="text-xs text-ink">Page 1 / 1</Text>
                <Text className="text-xs text-line">Next</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <FooterMenu current="Tickets" />
        <CreateTicketModal visible={creating} category="General" onClose={() => setCreating(false)} />
      </View>
    </Screen>
  );
}

function compareTickets(left: Ticket, right: Ticket, sort: (typeof sorts)[number]) {
  if (sort === 'Updated') {
    return left.updated.localeCompare(right.updated);
  }
  if (sort === 'Created') {
    return left.createdOn.localeCompare(right.createdOn);
  }
  if (sort === 'Progress') {
    return left.progress - right.progress;
  }
  if (sort === 'Title') {
    return left.title.localeCompare(right.title);
  }
  if (sort === 'Status') {
    return left.status.localeCompare(right.status);
  }
  return left.id.localeCompare(right.id);
}

function FilterButton({ label, open, onPress }: { label: string; open: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      className="flex-row items-center gap-1 rounded-xl border border-line px-3 py-2"
      onPress={onPress}
    >
      <Text className="text-xs font-medium text-ink">{label}</Text>
      <ChevronDown color={colors.ink} size={14} strokeWidth={1.75} />
    </Pressable>
  );
}

function OptionList<T extends string>({
  options,
  selected,
  label,
  onSelect,
}: {
  options: readonly T[];
  selected: T;
  label?: (value: T) => string;
  onSelect: (value: T) => void;
}) {
  return (
    <View className="mt-2 rounded-xl border border-canvas">
      {options.map(option => (
        <Pressable key={option} accessibilityRole="button" className="px-3 py-2" onPress={() => onSelect(option)}>
          <Text className={`text-sm ${option === selected ? 'font-semibold text-gold' : 'text-ink'}`}>
            {label ? label(option) : option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  table: {
    minWidth: 640,
  },
  column: {
    width: 128,
  },
});
