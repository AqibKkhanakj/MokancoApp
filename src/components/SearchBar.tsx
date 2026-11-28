import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Filter, Search } from 'lucide-react-native';
import { colors } from '../theme/palette';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
};

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  onFilterPress,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-11 flex-1 flex-row items-center rounded-xl px-3" style={styles.field}>
        <Search color={colors.line} size={16} strokeWidth={1.75} />
        <TextInput
          className="ml-2 h-11 flex-1 text-sm text-ink"
          placeholder={placeholder}
          placeholderTextColor={colors.line}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {onFilterPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open filters"
          className="h-11 w-11 items-center justify-center rounded-xl"
          style={styles.field}
          onPress={onFilterPress}
        >
          <Filter color={colors.ink} size={16} strokeWidth={1.75} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
  },
});
