import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileText, Image, LayoutGrid, Ticket, Wallet } from 'lucide-react-native';
import type { MenuTab, RootStackParamList } from '../navigation/types';
import { colors } from '../theme/palette';

const menu = [
  { key: 'Home', label: 'Home', icon: LayoutGrid },
  { key: 'Tickets', label: 'Tickets', icon: Ticket },
  { key: 'Accounts', label: 'Accounts', icon: Wallet },
  { key: 'Documents', label: 'Documents', icon: FileText },
  { key: 'MarketingAssets', label: 'Marketing Assets', icon: Image },
] as const;

type FooterMenuProps = {
  current: MenuTab;
};

export function FooterMenu({ current }: FooterMenuProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="w-full flex-row items-start bg-ink px-1 py-2" style={styles.menu}>
      {menu.map(item => {
        const active = item.key === current;
        const Icon = item.icon;
        const tint = active ? colors.gold : colors.canvas;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            className="flex-1 items-center"
            onPress={() => {
              if (item.key !== current) {
                navigation.navigate(item.key);
              }
            }}
          >
            <View className="h-9 w-9 items-center justify-center">
              <Icon color={tint} size={20} strokeWidth={1.75} />
            </View>
            <Text className={`mt-1 text-center text-[10px] font-medium leading-3 ${active ? 'text-gold' : 'text-canvas'}`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
});
