import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, Fingerprint, Lock, Mail, ScanFace } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { BrandLogo } from '../../components/BrandLogo';
import { FormField } from '../../components/FormField';
import { Screen } from '../../components/Screen';
import { colors } from '../../theme/palette';
import { loginSchema, type LoginFormValues } from './loginSchema';

export function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(true);
  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_values: LoginFormValues) => undefined;

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-1 justify-between px-6 py-4">
          <View className="mt-8 items-center">
            <BrandLogo className="h-10 w-48" />
            <Text className="mt-1 text-center text-[11px] font-medium tracking-[1px] text-gold">
              Yamani Special Coffee
            </Text>
            <Text className="mt-4 text-center text-2xl font-semibold text-ink">
              Welcome
            </Text>
            <Text className="mt-1 text-center text-sm leading-5 text-muted">
              Sign in to your Moka & Co{'\n'}partner account.
            </Text>
          </View>

          <View>
            <View className="gap-2">
              <FormField
                control={control}
                name="email"
                placeholder="Email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                icon={<Mail color={colors.muted} size={18} strokeWidth={1.75} />}
              />
              <FormField
                control={control}
                name="password"
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={!passwordVisible}
                textContentType="password"
                icon={<Lock color={colors.muted} size={18} strokeWidth={1.75} />}
                trailing={
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    hitSlop={8}
                    onPress={() => setPasswordVisible(current => !current)}
                  >
                    {passwordVisible ? (
                      <EyeOff color={colors.muted} size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye color={colors.muted} size={18} strokeWidth={1.75} />
                    )}
                  </Pressable>
                }
              />
            </View>

            <View className="mt-3 flex-row items-center justify-between">
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: remember }}
              className="flex-row items-center gap-2"
              onPress={() => setRemember(current => !current)}
            >
              <View
                className={`h-5 w-5 items-center justify-center rounded-md ${
                  remember ? 'bg-gold' : 'border border-line bg-surface'
                }`}
              >
                {remember ? (
                  <Check color="#FFFFFF" size={14} strokeWidth={3} />
                ) : null}
              </View>
              <Text className="text-xs text-ink">Remember me</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => undefined}>
              <Text className="text-xs font-medium text-gold">Forgot password?</Text>
            </Pressable>
          </View>

          <Button
            mode="contained"
            style={styles.signIn}
            contentStyle={styles.signInContent}
            labelStyle={styles.signInLabel}
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Sign in
          </Button>
          </View>

          <View className="mb-8">
            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-line" />
              <Text className="text-xs text-muted">or sign in with</Text>
              <View className="h-px flex-1 bg-line" />
            </View>

            <View className="mt-3 flex-row justify-center gap-8">
              <Pressable accessibilityRole="button" className="items-center" onPress={() => undefined}>
                <View className="h-11 w-14 items-center justify-center rounded-2xl bg-surface">
                  <ScanFace color={colors.ink} size={22} strokeWidth={1.75} />
                </View>
                <Text className="mt-1 text-xs text-ink">Face ID</Text>
              </Pressable>
              <Pressable accessibilityRole="button" className="items-center" onPress={() => undefined}>
                <View className="h-11 w-14 items-center justify-center rounded-2xl bg-surface">
                  <Fingerprint color={colors.ink} size={22} strokeWidth={1.75} />
                </View>
                <Text className="mt-1 text-xs text-ink">Fingerprint</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  signIn: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 0,
  },
  signInContent: {
    height: 44,
  },
  signInLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
