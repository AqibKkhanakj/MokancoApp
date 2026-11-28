
import type { ReactNode } from 'react';
import {
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import { colors } from '../theme/palette';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  label?: string;
  required?: boolean;
  multiline?: boolean;
  tone?: 'light' | 'dark';
  rules?: RegisterOptions<T, FieldPath<T>>;
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
  label,
  required = false,
  multiline = false,
  tone = 'light',
  rules,
  ...inputProps
}: FormFieldProps<T>) {
  const isLight = tone === 'light';

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View>
          {label ? (
            <Text className="mb-1 text-sm font-medium text-ink">
              {label}
              {required ? <Text className="text-danger"> *</Text> : null}
            </Text>
          ) : null}

          <View
            className={`flex-row items-center border-b ${
              error
                ? 'border-danger'
                : isLight
                  ? 'border-canvas'
                  : 'border-line'
            } ${multiline ? 'min-h-24 items-start' : 'h-11'}`}
          >
            {icon ? (
              <View className={multiline ? 'pt-2' : ''}>
                {icon}
              </View>
            ) : null}

            <TextInput
              className={`ml-2 flex-1 text-sm ${
                isLight ? 'text-canvas' : 'text-ink'
              } ${multiline ? 'py-2' : 'h-full'}`}
              placeholder={placeholder}
              placeholderTextColor={
                isLight ? colors.canvas : colors.line
              }
              value={value == null ? '' : String(value)}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline={multiline}
              textAlignVertical={multiline ? 'top' : 'center'}
              {...inputProps}
            />

            {trailing}
          </View>

          {error ? (
            <Text className="mt-1 px-1 text-xs text-danger">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}
