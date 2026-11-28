
import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export function AppButton({
  title,
  onPress,
  icon,
  className = '',
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center gap-1 rounded-xl bg-gold px-4 py-2.5 ${className} ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {icon ? <View>{icon}</View> : null}

      <Text className="text-sm font-semibold text-surface">
        {title}
      </Text>
    </Pressable>
  );
}
