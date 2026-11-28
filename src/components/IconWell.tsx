import { StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { colors } from '../theme/palette';

type IconWellProps = {
  icon: LucideIcon;
};

export function IconWell({ icon: Icon }: IconWellProps) {
  return (
    <View className="h-11 w-11 items-center justify-center rounded-full" style={styles.well}>
      <Icon color={colors.gold} size={18} strokeWidth={1.75} />
    </View>
  );
}

const styles = StyleSheet.create({
  well: {
    backgroundColor: '#F3E6D4',
  },
});
