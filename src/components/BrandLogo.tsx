import { Image } from 'react-native';

const sources = {
  wordmark: require('../assets/brand/moka-wordmark.png'),
  mark: require('../assets/brand/moka-mark.png'),
} as const;

type BrandLogoProps = {
  variant?: keyof typeof sources;
  className?: string;
};

export function BrandLogo({ variant = 'wordmark', className }: BrandLogoProps) {
  const isMark = variant === 'mark';

  return (
    <Image
      source={sources[variant]}
      accessibilityRole="image"
      accessibilityLabel="Moka and Co"
      resizeMode="contain"
      className={className ?? (isMark ? 'h-12 w-8' : 'h-12 w-full')}
    />
  );
}
