import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from 'react-native-paper';
import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/palette';

type TicketScreenProps = NativeStackScreenProps<RootStackParamList, 'Ticket'>;

export function TicketScreen({ navigation, route }: TicketScreenProps) {
  const { title, detail } = route.params;
  const [request, setRequest] = useState('');

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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            className="h-10 w-10 items-center justify-center rounded-full bg-surface"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft color={colors.ink} size={20} strokeWidth={1.75} />
          </Pressable>
          <Text className="mt-5 text-2xl font-semibold text-ink">{title}</Text>
          <Text className="mt-1 text-sm leading-5 text-line">{detail}</Text>
          <TextInput
            className="mt-4 min-h-32 rounded-2xl bg-surface px-4 py-3 text-sm text-ink"
            placeholder="Describe your request"
            placeholderTextColor={colors.line}
            multiline
            textAlignVertical="top"
            value={request}
            onChangeText={setRequest}
          />
          <Button
            mode="contained"
            style={styles.submit}
            contentStyle={styles.submitContent}
            labelStyle={styles.submitLabel}
            buttonColor={colors.gold}
            textColor={colors.surface}
            onPress={() => navigation.goBack()}
          >
            Submit
          </Button>
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
  submit: {
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 0,
  },
  submitContent: {
    height: 44,
  },
  submitLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
