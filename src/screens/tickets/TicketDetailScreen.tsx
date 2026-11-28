import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { StatusBadge } from '../../components/StatusBadge';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/palette';
import { findTicket } from './tickets';

type TicketDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TicketDetail'>;

export function TicketDetailScreen({ navigation, route }: TicketDetailScreenProps) {
  const ticket = findTicket(route.params.id);

  return (
    <Screen>
      <View className="flex-1">
        <WorkspaceHeader />
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            className="h-10 w-10 items-center justify-center rounded-xl bg-surface"
            style={styles.surface}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft color={colors.ink} size={20} strokeWidth={1.75} />
          </Pressable>

          {ticket ? (
            <View className="mt-4">
              <Text className="text-sm font-semibold text-line">{ticket.id}</Text>
              <View className="mt-2">
                <StatusBadge label={ticket.status} />
              </View>
              <Text className="mt-3 text-2xl font-semibold text-ink">{ticket.title}</Text>
              <Text className="mt-1 text-sm text-line">
                {ticket.category} · {ticket.location}
              </Text>

              <View className="mt-4 flex-row gap-2">
                <Fact label="Status" value={ticket.status} />
                <Fact label="Priority" value={ticket.priority} />
                <Fact label="Progress" value={`${ticket.progress}%`} />
              </View>

              <View className="mt-3 rounded-xl px-4" style={styles.surface}>
                <DetailRow label="Requester" value={ticket.requester} />
                <DetailRow label="Assignee" value={ticket.assignee} />
                <DetailRow label="Created" value={ticket.created} />
                <DetailRow label="Deadline" value={ticket.deadline} />
              </View>

              <View className="mt-3 rounded-xl px-4 py-4" style={styles.surface}>
                <Text className="text-xs font-semibold text-line">Description</Text>
                <Text className="mt-2 text-sm leading-5 text-ink">{ticket.description}</Text>
              </View>
            </View>
          ) : (
            <Text className="mt-6 text-sm text-line">This ticket could not be found.</Text>
          )}
        </ScrollView>
        <FooterMenu current="Tickets" />
      </View>
    </Screen>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-xl px-3 py-3" style={styles.surface}>
      <Text className="text-[11px] text-line">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-ink">{value}</Text>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="border-b border-canvas py-3">
      <Text className="text-xs text-line">{label}</Text>
      <Text className="mt-1 text-sm font-semibold text-ink">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  surface: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
  },
});
