import type { ReactNode } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { colors } from '../theme/palette';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  icon: ReactNode;
  trailing?: ReactNode;
} & Pick<
  TextInputProps,
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'keyboardType'
  | 'secureTextEntry'
  | 'textContentType'
>;

export function FormField<T extends FieldValues>({
  control,
  name,
  placeholder,
  icon,
  trailing,
  ...inputProps
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View>
          <View
            className={`h-11 flex-row items-center rounded-2xl bg-surface px-3 ${
              error ? 'border border-danger' : ''
            }`}
          >
            {icon}
            <TextInput
              className="ml-2 h-full flex-1 text-sm text-ink"
              placeholder={placeholder}
              placeholderTextColor={colors.muted}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              {...inputProps}
            />
            {trailing}
          </View>
          {error ? (
            <Text className="mt-1 px-1 text-xs text-danger">{error.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
}
