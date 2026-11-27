
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

export function CreateTicketModal({
  visible,
  category,
  onClose,
}: CreateTicketModalProps) {
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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Close create ticket"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          <View style={styles.modalCard}>
            {/* Header */}
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heading}>Create ticket</Text>
                <Text style={styles.subtitle}>
                  Submit a new request to the ticket queue.
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                hitSlop={10}
                onPress={onClose}
                style={styles.closeButton}
              >
                <X color={colors.ink} size={20} strokeWidth={1.8} />
              </Pressable>
            </View>

            {/* Form */}
            <ScrollView
              style={styles.form}
              contentContainerStyle={styles.formContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <Field
                label="Category"
                value={categoryValue}
                onChangeText={setCategoryValue}
              />

              <Field
                label="Title"
                value={title}
                onChangeText={setTitle}
                placeholder="Enter ticket title"
              />

              <Field
                label="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your issue or request..."
                multiline
              />

              {error ? (
                <Text style={styles.error}>{error}</Text>
              ) : null}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <Pressable
                accessibilityRole="button"
                onPress={onClose}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={submit}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Create ticket</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A19B92"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        autoCapitalize="sentences"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(25, 23, 20, 0.62)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  keyboardContainer: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '100%',
    justifyContent: 'center',
  },

  modalCard: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE8',
  },

  heading: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.ink,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#77736D',
    marginTop: 5,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F6F5F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  form: {
    flexShrink: 1,
  },

  formContent: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 10,
  },

  field: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
    marginBottom: 9,
  },

  required: {
    color: '#D94B42',
  },

  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E8E4DE',
    borderRadius: 11,
    paddingHorizontal: 13,
    fontSize: 14,
    color: colors.ink,
    backgroundColor: '#FFFFFF',
  },

  multilineInput: {
    minHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },

  error: {
    fontSize: 12,
    color: '#D94B42',
    marginBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: '#F0EDE8',
    backgroundColor: '#FFFFFF',
  },

  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.ink,
  },

  submitButton: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },

  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
