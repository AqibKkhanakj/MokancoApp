import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/palette';

type StatusBadgeProps = {
  label: string;
};

const tones: Record<string, { background: string; color: string }> = {
  Open: { background: colors.canvas, color: colors.gold },
  New: { background: colors.canvas, color: colors.gold },
  'In queue': { background: colors.canvas, color: colors.gold },
  'In progress': { background: colors.canvas, color: colors.ink },
  Completed: { background: colors.ink, color: colors.surface },
  Closed: { background: colors.ink, color: colors.surface },
  Cancelled: { background: colors.canvas, color: colors.danger },
};

export function StatusBadge({ label }: StatusBadgeProps) {
  const tone = tones[label] ?? { background: colors.canvas, color: colors.ink };

  return (
    <View style={[styles.badge, { backgroundColor: tone.background }]}>
      <Text style={[styles.text, { color: tone.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
