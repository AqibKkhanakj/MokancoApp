
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ArrowRight,
  Bell,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Globe,
  Headset,
  Layers,
  Monitor,
  Store,
  Truck,
} from 'lucide-react-native';

import { CreateTicketModal } from '../../components/CreateTicketModal';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { AppButton } from '../../components/AppButton';
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
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Workspace Header */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-ink">
                Workspace
              </Text>
              <Text className="text-xs text-line">
                Test 1
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Bell
                color={colors.ink}
                size={18}
                strokeWidth={1.75}
              />

              <View className="h-6 w-6 items-center justify-center rounded-full bg-gold">
                <Text className="text-[11px] font-semibold leading-none text-surface">
                  T
                </Text>
              </View>

              <View>
                <Text className="text-[11px] font-semibold leading-3 text-ink">
                  Test1
                </Text>
                <Text className="text-[10px] leading-3 text-line">
                  Partner
                </Text>
              </View>

              <ChevronDown
                color={colors.ink}
                size={14}
                strokeWidth={1.75}
              />
            </View>
          </View>

          {/* Page Heading */}
          <Text className="mt-5 text-2xl font-semibold text-ink">
            Ticket center
          </Text>

          <Text className="mt-1 text-sm leading-5 text-line">
            Create a ticket or start from a quick template below.
          </Text>

          {/* General Ticket */}
          <View
            className="mt-4 rounded-2xl p-4"
            style={styles.started}
          >
            <Text className="text-[11px] font-semibold tracking-[1px] text-gold">
              GET STARTED
            </Text>

            <Text className="mt-2 text-base font-semibold text-ink">
              Create ticket
            </Text>

            <Text className="mt-1 text-sm leading-5 text-line">
              Open a blank form to describe your request in your own words.
              Submit your request without leaving this page.
            </Text>

            <AppButton
              title="Create new ticket"
              onPress={() => openTicket('General')}
              className="mt-4 self-end"
            />
          </View>

          {/* Quick Tickets Heading */}
          <Text className="mt-6 text-base font-semibold text-ink">
            Open quick ticket
          </Text>

          <Text className="mt-1 text-sm leading-5 text-line">
            Choose a category and select Start ticket to open a prefilled
            request form.
          </Text>

          {/* Quick Ticket Cards */}
          <View className="mt-3 gap-3">
            {quickTickets.map((ticket) => {
              const Icon = ticket.icon;

              return (
                <View
                  key={ticket.title}
                  className="rounded-2xl bg-surface p-4"
                  style={styles.card}
                >
                  <View className="flex-row items-start gap-3">
                    {/* Category Icon */}
                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-canvas">
                      <Icon
                        color={colors.ink}
                        size={19}
                        strokeWidth={1.75}
                      />
                    </View>

                    {/* Category Details and Start Ticket */}
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-ink">
                        {ticket.title}
                      </Text>

                      <Text className="mt-1 text-sm leading-5 text-line">
                        {ticket.detail}
                      </Text>

                      {/* Start Ticket - Aligned Under Text */}
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Start ${ticket.title} ticket`}
                        className="mt-3 flex-row items-center gap-1 self-start"
                        onPress={() => openTicket(ticket.title)}
                      >
                        <Text className="text-sm font-semibold text-gold">
                          Start ticket
                        </Text>

                        <ArrowRight
                          color={colors.gold}
                          size={15}
                          strokeWidth={2}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <FooterMenu current="Home" />

        {/* Create Ticket Modal */}
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
    paddingTop: 16,
    paddingBottom: 24,
  },

  started: {
    backgroundColor: '#F8F3EC',
    borderWidth: 1,
    borderColor: '#EDE2D4',
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
