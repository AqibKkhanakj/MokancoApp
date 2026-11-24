import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClipboardList, Coffee, House, UserRound } from 'lucide-react-native';
import type { MenuTab, RootStackParamList } from '../navigation/types';
import { colors } from '../theme/palette';

const menu = [
  { key: 'Home', label: 'Home', icon: House },
  { key: 'Orders', label: 'Orders', icon: ClipboardList },
  { key: 'Products', label: 'Products', icon: Coffee },
  { key: 'Account', label: 'Account', icon: UserRound },
] as const;

type FooterMenuProps = {
  current: MenuTab;
};

export function FooterMenu({ current }: FooterMenuProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="w-full flex-row items-center bg-ink px-2 py-3" style={styles.menu}>
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
            <Icon
              color={tint}
              fill={active ? colors.gold : 'transparent'}
              size={22}
              strokeWidth={active ? 2 : 1.75}
            />
            <Text className={`mt-1 text-[11px] font-medium ${active ? 'text-gold' : 'text-canvas'}`}>
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
