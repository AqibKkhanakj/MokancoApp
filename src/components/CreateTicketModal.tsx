
import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { X, ArrowRight } from 'lucide-react-native';
import { useForm } from 'react-hook-form';

import { colors } from '../theme/palette';
import { FormField } from './FormField';
import { AppButton } from './AppButton';

type TicketFormValues = {
  category: string;
  title: string;
  description: string;
};

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
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<TicketFormValues>({
    defaultValues: {
      category: 'General',
      title: '',
      description: '',
    },
  });

  // Prefill category and reset fields whenever modal opens.
  useEffect(() => {
    if (visible) {
      reset({
        category,
        title: '',
        description: '',
      });
    }
  }, [visible, category, reset]);

  const submit = (data: TicketFormValues) => {
    console.log('Ticket data:', data);

    // Add ticket API integration here.
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
        {/* Outside press to close */}
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
                <X
                  color={colors.ink}
                  size={20}
                  strokeWidth={1.75}
                />
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
              <View className="gap-5">
                <FormField
                  control={control}
                  name="category"
                  label="Category"
                  placeholder="Category"
                  required
                  tone="dark"
                  rules={{
                    required: 'Category is required.',
                  }}
                />

                <FormField
                  control={control}
                  name="title"
                  label="Title"
                  placeholder="Enter ticket title"
                  required
                  tone="dark"
                  rules={{
                    required: 'Title is required.',
                  }}
                />

                <FormField
                  control={control}
                  name="description"
                  label="Description"
                  placeholder="Describe your issue or request..."
                  required
                  tone="dark"
                  multiline
                  rules={{
                    required: 'Description is required.',
                  }}
                />
              </View>
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

              <AppButton
                title="Create ticket"
                onPress={handleSubmit(submit)}
                icon={
                  <ArrowRight
                    color={colors.surface}
                    size={16}
                    strokeWidth={2}
                  />
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(46, 46, 42, 0.58)',
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
    shadowColor: '#000000',
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
    paddingBottom: 24,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 22,
    paddingVertical: 18,
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
});
