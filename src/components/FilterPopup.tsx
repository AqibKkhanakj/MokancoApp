import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { colors } from '../theme/palette';
import { AppButton } from './AppButton';

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterSection = {
  title: string;
  selected: string;
  defaultValue?: string;
  options: readonly FilterOption[];
  onChange: (value: string) => void;
};

type FilterPopupProps = {
  visible: boolean;
  title?: string;
  sections: readonly FilterSection[];
  onClose: () => void;
};

export function FilterPopup({
  visible,
  title = 'Filters',
  sections,
  onClose,
}: FilterPopupProps) {
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (visible) {
      setDraft(Object.fromEntries(sections.map(section => [section.title, section.selected])));
    }
  }, [visible, sections]);

  const applyValues = (values: Record<string, string>) => {
    sections.forEach(section => {
      const value = values[section.title];
      if (value) {
        section.onChange(value);
      }
    });
    onClose();
  };

  const apply = () => applyValues(draft);

  const clear = () => {
    const cleared = Object.fromEntries(
      sections.map(section => [section.title, section.defaultValue ?? section.options[0]?.value ?? '']),
    );
    setDraft(cleared);
    applyValues(cleared);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => undefined}>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-ink">{title}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Close filters" onPress={onClose}>
              <X color={colors.ink} size={18} strokeWidth={1.75} />
            </Pressable>
          </View>
          {sections.map(section => (
            <View key={section.title} className="mt-3">
              <Text className="text-xs font-semibold text-line">{section.title}</Text>
              {section.options.map(option => {
                const active = draft[section.title] === option.value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: active }}
                    className="flex-row items-center gap-3 border-b border-canvas py-3"
                    onPress={() => setDraft(current => ({ ...current, [section.title]: option.value }))}
                  >
                    <View style={[styles.tick, active ? styles.tickOn : null]}>
                      {active ? <Check color={colors.surface} size={12} strokeWidth={3} /> : null}
                    </View>
                    <Text className={`text-sm ${active ? 'font-semibold text-ink' : 'text-ink'}`}>{option.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
          <View className="mt-4 gap-2">
            <AppButton title="Apply filter" onPress={apply} className="w-full" />
            <Pressable accessibilityRole="button" className="items-center rounded-xl border border-line py-2.5" onPress={clear}>
              <Text className="text-sm font-semibold text-ink">Clear filter</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(46, 46, 42, 0.45)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  tick: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickOn: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
});
