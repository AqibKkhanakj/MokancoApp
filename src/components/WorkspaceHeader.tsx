import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, ChevronDown } from 'lucide-react-native';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/palette';

export function WorkspaceHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [open, setOpen] = useState(false);

  return (
    <View className="z-20 px-5 pb-3 pt-4" style={styles.header}>
      <View className="flex-row items-center justify-end">
        <Bell color={colors.ink} size={18} strokeWidth={1.75} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile menu"
          accessibilityState={{ expanded: open }}
          className="ml-5 flex-row items-center gap-2"
          onPress={() => setOpen(current => !current)}
        >
          <View className="h-6 w-6 items-center justify-center rounded-full bg-gold">
            <Text className="text-[11px] font-semibold leading-none text-surface">T</Text>
          </View>
          <View>
            <Text className="text-[11px] font-semibold leading-3 text-ink">Test1</Text>
            <Text className="text-[10px] leading-3 text-line">Partner</Text>
          </View>
          <ChevronDown color={colors.ink} size={14} strokeWidth={1.75} />
        </Pressable>
      </View>

      {open ? (
        <View className="absolute right-5 top-14 rounded-xl bg-surface px-1 py-1" style={styles.menu}>
          <Pressable
            accessibilityRole="button"
            className="px-4 py-2"
            onPress={() => {
              setOpen(false);
              navigation.replace('Login');
            }}
          >
            <Text className="text-sm font-semibold text-ink">Logout</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 20,
  },
  menu: {
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
});
