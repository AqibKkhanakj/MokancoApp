import type { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: ReactNode;
  background?: ImageSourcePropType;
};

export function Screen({ children, background }: ScreenProps) {
  const content = (
    <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  );

  if (background) {
    return (
      <ImageBackground source={background} resizeMode="cover" style={styles.fill}>
        {content}
      </ImageBackground>
    );
  }

  return <View className="flex-1 bg-canvas">{content}</View>;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
