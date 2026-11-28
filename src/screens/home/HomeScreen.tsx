import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  Headset,
  Layers,
  Monitor,
  Plus,
  Store,
  Truck,
} from 'lucide-react-native';
import { CreateTicketModal } from '../../components/CreateTicketModal';
import { IconWell } from '../../components/IconWell';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { colors } from '../../theme/palette';

const quickTickets = [
  {
    title: 'IT / Web',
    detail: 'Workstations, network, access, and hardware',
    icon: Headset,
  },
  {
    title: 'Google',
    detail: 'Workspace, Gmail, Drive, and related tools',
    icon: Globe,
  },
  {
    title: 'Delivery integration',
    detail: 'Delivery platforms and order sync',
    icon: Truck,
  },
  {
    title: 'Appfront',
    detail: 'Appfront ordering and configuration',
    icon: Layers,
  },
  {
    title: 'Toast',
    detail: 'Toast POS, orders, KDS, and in-store operations',
    icon: Store,
  },
  {
    title: 'Payment / Transaction',
    detail: 'Card readers, declines, refunds, and settlement questions',
    icon: CreditCard,
  },
  {
    title: 'Menu / Item updates',
    detail: 'Menu changes, pricing, modifiers, and item availability',
    icon: ClipboardList,
  },
  {
    title: 'Device / Hardware',
    detail: 'Terminals, tablets, printers, and network gear',
    icon: Monitor,
  },
] as const;

export function HomeScreen() {
  const [ticketCategory, setTicketCategory] = useState<string | null>(null);

  const openTicket = (category: string) => {
    setTicketCategory(category);
  };

  const closeTicket = () => {
    setTicketCategory(null);
  };

  return (
    <Screen>
      <View className="flex-1">
        <WorkspaceHeader />
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-semibold text-ink">Ticket center</Text>
          <Text className="mt-1 text-sm leading-5 text-line">
            Create a ticket or start from a quick template below.
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Create a ticket"
            className="mt-4 flex-row items-center rounded-2xl px-4 py-4"
            style={styles.banner}
            onPress={() => openTicket('General')}
          >
            <View className="h-12 w-12 items-center justify-center">
              <FileText color={colors.surface} size={30} strokeWidth={1.6} />
              <View className="absolute bottom-0 right-0 h-5 w-5 items-center justify-center rounded-full" style={styles.plusBadge}>
                <Plus color={colors.surface} size={12} strokeWidth={2.6} />
              </View>
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-[11px] font-semibold tracking-[1px] text-canvas">GET STARTED</Text>
              <Text className="mt-1 text-lg font-semibold text-surface">Create ticket</Text>
              <Text className="mt-1 text-sm leading-5 text-canvas">
                Open a blank form to describe your request in your own words. Submit your request without leaving this page.
              </Text>
            </View>
            <View className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-surface">
              <Plus color={colors.gold} size={18} strokeWidth={2.2} />
            </View>
          </Pressable>

          <Text className="mt-6 text-base font-semibold text-ink">Open quick ticket</Text>
          <Text className="mt-1 text-sm leading-5 text-line">
            Choose a category and select Start ticket to open a prefilled request form.
          </Text>

          <View className="mt-3 flex-row flex-wrap justify-between">
            {quickTickets.map(ticket => {
              const Icon = ticket.icon;
              return (
                <Pressable
                  key={ticket.title}
                  accessibilityRole="button"
                  accessibilityLabel={`Start ${ticket.title} ticket`}
                  className="mb-3 flex-row items-center rounded-2xl bg-surface px-3 py-3"
                  style={styles.card}
                  onPress={() => openTicket(ticket.title)}
                >
                  <IconWell icon={Icon} />
                  <Text className="mx-2 flex-1 text-sm font-semibold leading-5 text-ink" numberOfLines={2}>
                    {ticket.title}
                  </Text>
                  <ChevronRight color={colors.line} size={16} strokeWidth={1.75} />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        <FooterMenu current="Home" />
        <CreateTicketModal
          visible={ticketCategory !== null}
          category={ticketCategory ?? 'General'}
          onClose={closeTicket}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  banner: {
    backgroundColor: colors.gold,
  },
  plusBadge: {
    backgroundColor: colors.gold,
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  card: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
});
