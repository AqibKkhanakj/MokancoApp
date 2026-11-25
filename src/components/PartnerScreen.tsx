import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { MenuTab } from '../navigation/types';
import { BrandLogo } from './BrandLogo';
import { FooterMenu } from './FooterMenu';
import { Screen } from './Screen';

type PartnerScreenProps = {
  title: string;
  tab: MenuTab;
  children?: ReactNode;
};

export function PartnerScreen({ title, tab, children }: PartnerScreenProps) {
  return (
    <Screen>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-8 items-center">
            <BrandLogo className="h-10 w-48" />
            <Text className="mt-1 text-center text-[11px] font-medium tracking-[1px] text-ink">
              Yamani Speciality Coffee
            </Text>
            <Text className="mt-4 text-center text-2xl font-semibold text-ink">{title}</Text>
            <Text className="mt-1 text-center text-sm leading-5 text-ink">
              Your Moka & Co{'\n'}partner account.
            </Text>
          </View>
          {children ? <View className="mt-6">{children}</View> : null}
        </ScrollView>
        <FooterMenu current={tab} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
});
