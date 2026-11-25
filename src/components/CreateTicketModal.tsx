import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../theme/palette';

type CreateTicketModalProps = {
  visible: boolean;
  category: string;
  onClose: () => void;
};

export function CreateTicketModal({ visible, category, onClose }: CreateTicketModalProps) {
  const [categoryValue, setCategoryValue] = useState(category);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setCategoryValue(category);
      setTitle('');
      setDescription('');
      setError('');
    }
  }, [visible, category]);

  const submit = () => {
    if (!categoryValue.trim() || !title.trim() || !description.trim()) {
      setError('Fill in category, title, and description.');
      return;
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-center px-5" style={styles.backdrop}>
          <Pressable accessibilityLabel="Close create ticket" className="absolute inset-0" onPress={onClose} />
          <View className="rounded-3xl bg-surface px-5 py-5" style={styles.sheet}>
            <View className="flex-row items-start justify-between">
              <Text className="flex-1 text-xl font-semibold text-ink">Create ticket</Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={8} onPress={onClose}>
                <X color={colors.line} size={20} strokeWidth={1.75} />
              </Pressable>
            </View>
            <Text className="mt-1 text-sm leading-5 text-line">
              Submit a new request to the ticket queue.
            </Text>

            <ScrollView className="mt-5" keyboardShouldPersistTaps="handled" bounces={false}>
              <Field label="Category" value={categoryValue} onChangeText={setCategoryValue} />
              <Field label="Title" value={title} onChangeText={setTitle} />
              <Field
                label="Description"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              {error ? <Text className="mt-3 text-xs text-danger">{error}</Text> : null}
            </ScrollView>

            <View className="mt-5 flex-row items-center justify-end gap-3">
              <Pressable accessibilityRole="button" className="px-3 py-2" onPress={onClose}>
                <Text className="text-sm font-medium text-ink">Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="rounded-xl bg-gold px-4 py-2.5"
                onPress={submit}
              >
                <Text className="text-sm font-semibold text-surface">Create ticket</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View className="mb-4">
      <Text className="text-sm text-ink">
        {label} <Text className="text-danger">*</Text>
      </Text>
      <TextInput
        className={`border-b border-line text-sm text-ink ${multiline ? 'min-h-24 py-2' : 'h-10'}`}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(46, 46, 42, 0.45)',
  },
  sheet: {
    maxHeight: '86%',
  },
});
