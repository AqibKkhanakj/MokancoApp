import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import type { RootStackParamList } from '../../navigation/types';
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

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();

  const openTicket = (title: string, detail: string) => {
    navigation.navigate('Ticket', { title, detail });
  };

  return (
    <Screen>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
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

          <Text className="mt-5 text-2xl font-semibold text-ink">Ticket center</Text>
          <Text className="mt-1 text-sm leading-5 text-line">
            Create a ticket or start from a quick template below.
          </Text>

          <View className="mt-4 rounded-2xl p-4" style={styles.started}>
            <Text className="text-[11px] font-semibold tracking-[1px] text-gold">GET STARTED</Text>
            <Text className="mt-2 text-base font-semibold text-ink">Create ticket</Text>
            <Text className="mt-1 text-sm leading-5 text-line">
              Open a blank form to describe your request in your own words. A window will open so
              you can submit without leaving this page.
            </Text>
            <View className="mt-4 items-end">
              <Pressable
                accessibilityRole="button"
                className="flex-row items-center gap-1 rounded-xl bg-gold px-4 py-2.5"
                onPress={() =>
                  openTicket(
                    'Create ticket',
                    'Open a blank form to describe your request in your own words.',
                  )
                }
              >
                <Text className="text-sm font-semibold text-surface">New ticket</Text>
                <ArrowRight color={colors.surface} size={16} strokeWidth={2} />
              </Pressable>
            </View>
          </View>

          <Text className="mt-6 text-base font-semibold text-ink">Open quick ticket</Text>
          <Text className="mt-1 text-sm leading-5 text-line">
            Choose a category to open the form with details already filled in. You can edit
            everything before submitting.
          </Text>

          {quickTickets.map(ticket => {
            const Icon = ticket.icon;
            return (
              <Pressable
                key={ticket.title}
                accessibilityRole="button"
                className="mt-3 rounded-2xl bg-surface p-4"
                style={styles.card}
                onPress={() => openTicket(ticket.title, ticket.detail)}
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-canvas">
                    <Icon color={colors.ink} size={18} strokeWidth={1.75} />
                  </View>
                  <Text className="flex-1 text-base font-semibold text-ink">{ticket.title}</Text>
                </View>
                <Text className="mt-2 text-sm leading-5 text-line">{ticket.detail}</Text>
                <View className="mt-3 flex-row items-center gap-1">
                  <Text className="text-sm font-semibold text-gold">Start ticket</Text>
                  <ArrowRight color={colors.gold} size={14} strokeWidth={2} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        <FooterMenu current="Home" />
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
  },
  card: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
});
