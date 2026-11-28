import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  Headset,
  Layers,
  Monitor,
  Plus,
  Store,
  Truck,
  Wrench,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { AppButton } from '../../components/AppButton';
import { IconWell } from '../../components/IconWell';
import { CreateTicketModal } from '../../components/CreateTicketModal';
import { FilterPopup } from '../../components/FilterPopup';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { SearchBar } from '../../components/SearchBar';
import { StatusBadge } from '../../components/StatusBadge';
import { StatusFilters } from '../../components/StatusFilters';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/palette';
import { tickets, type Ticket } from './tickets';

const filters = ['All', 'Open', 'In progress', 'Closed'] as const;
const sorts = ['Updated', 'Created', 'Progress', 'Title', 'Status', 'Ticket ID'] as const;
type Filter = (typeof filters)[number];
type Sort = (typeof sorts)[number];
type TicketGroup = 'Open' | 'In progress' | 'Closed';

const icons: Record<string, LucideIcon> = {
  'Device / Hardware': Monitor,
  'Menu / Item updates': ClipboardList,
  'Payment / Transaction': CreditCard,
  'Delivery integration': Truck,
  Google: FileText,
  Toast: Store,
  'IT / Web': Headset,
  Appfront: Layers,
};

export function TicketsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [sort, setSort] = useState<Sort>('Created');
  const [descending, setDescending] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const visibleTickets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matched = tickets.filter(ticket => {
      const group = groupOf(ticket.status);
      const matchesFilter = filter === 'All' || group === filter;
      const matchesQuery =
        needle.length === 0 ||
        ticket.title.toLowerCase().includes(needle) ||
        ticket.id.toLowerCase().includes(needle) ||
        ticket.detail.toLowerCase().includes(needle) ||
        ticket.category.toLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
    const direction = descending ? -1 : 1;
    return [...matched].sort((left, right) => direction * compareTickets(left, right, sort));
  }, [query, filter, sort, descending]);

  return (
    <Screen>
      <View className="flex-1">
        <WorkspaceHeader />
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text className="text-2xl font-semibold text-ink">Ticket history</Text>
            <Text className="mt-1 text-sm leading-5 text-line">
              View and track all your requests in one place.
            </Text>
            <AppButton
              title="New ticket"
              onPress={() => setCreating(true)}
              className="mt-3 w-full"
              icon={<Plus color={colors.surface} size={14} strokeWidth={2.4} />}
            />
          </View>

          <View className="mt-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search tickets"
              onFilterPress={() => setFiltersOpen(true)}
            />
          </View>

          <View className="mt-4">
            <StatusFilters options={filters} selected={filter} onChange={setFilter} />
          </View>

          {visibleTickets.length === 0 ? (
            <View className="mt-8 items-center rounded-2xl bg-surface px-5 py-10">
              <Text className="text-sm text-line">No tickets found.</Text>
            </View>
          ) : (
            visibleTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onPress={() => navigation.navigate('TicketDetail', { id: ticket.id })}
              />
            ))
          )}
        </ScrollView>
        <FooterMenu current="Tickets" />
        <CreateTicketModal visible={creating} category="General" onClose={() => setCreating(false)} />
        <FilterPopup
          visible={filtersOpen}
          title="Ticket filters"
          onClose={() => setFiltersOpen(false)}
          sections={[
            {
              title: 'Sort',
              selected: sort,
              defaultValue: 'Created',
              options: sorts.map(item => ({ label: item, value: item })),
              onChange: value => setSort(value as Sort),
            },
            {
              title: 'Direction',
              selected: descending ? 'Descending' : 'Ascending',
              defaultValue: 'Descending',
              options: [
                { label: 'Ascending', value: 'Ascending' },
                { label: 'Descending', value: 'Descending' },
              ],
              onChange: value => setDescending(value === 'Descending'),
            },
          ]}
        />
      </View>
    </Screen>
  );
}

function TicketCard({ ticket, onPress }: { ticket: Ticket; onPress: () => void }) {
  const Icon = icons[ticket.category] ?? Wrench;

  return (
    <Pressable accessibilityRole="button" className="mt-3 flex-row rounded-2xl p-3" style={styles.card} onPress={onPress}>
      <IconWell icon={Icon} />
      <View className="ml-3 flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <View className="flex-1">
            <Text className="text-base font-semibold text-ink">{ticket.title}</Text>
            <Text className="mt-0.5 text-xs text-line">#{ticket.id}</Text>
          </View>
          <StatusBadge label={badgeLabel(ticket.status)} />
        </View>
        <View className="mt-2 flex-row items-center">
          <Text className="flex-1 text-xs leading-4 text-line" numberOfLines={1}>
            {ticket.detail}
          </Text>
          <Text className="ml-2 text-xs text-line">Due {ticket.deadline.split(',')[0]}</Text>
          <ChevronRight color={colors.line} size={14} strokeWidth={1.75} />
        </View>
      </View>
    </Pressable>
  );
}

function compareTickets(left: Ticket, right: Ticket, sort: Sort) {
  if (sort === 'Progress') {
    return left.progress - right.progress;
  }
  if (sort === 'Title') {
    return left.title.localeCompare(right.title);
  }
  if (sort === 'Status') {
    return left.status.localeCompare(right.status);
  }
  if (sort === 'Ticket ID') {
    return left.id.localeCompare(right.id);
  }
  if (sort === 'Updated') {
    return new Date(left.updated).getTime() - new Date(right.updated).getTime();
  }
  return new Date(left.created).getTime() - new Date(right.created).getTime();
}

function groupOf(status: Ticket['status']): TicketGroup {
  if (status === 'In progress') {
    return 'In progress';
  }
  if (status === 'In queue' || status === 'New') {
    return 'Open';
  }
  return 'Closed';
}

function badgeLabel(status: Ticket['status']) {
  if (status === 'Cancelled') {
    return 'Cancelled';
  }
  return groupOf(status);
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
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
});
