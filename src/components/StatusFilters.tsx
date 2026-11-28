import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/palette';

type StatusFiltersProps<T extends string> = {
  options: readonly T[];
  selected: T;
  onChange: (value: T) => void;
};

export function StatusFilters<T extends string>({
  options,
  selected,
  onChange,
}: StatusFiltersProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map(option => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className="rounded-xl px-4 py-2"
            style={{ backgroundColor: active ? colors.gold : colors.surface }}
            onPress={() => onChange(option)}
          >
            <Text className={`text-sm font-semibold ${active ? 'text-surface' : 'text-ink'}`}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
  },
});
