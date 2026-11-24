import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { BrandLogo } from '../../components/BrandLogo';
import { Screen } from '../../components/Screen';
import type { RootStackParamList } from '../../navigation/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <Screen background={require('../../assets/brand/d-bg.jpg')}>
      <View className="flex-1 justify-between px-6 py-4">
        <View className="mt-8 items-center">
          <BrandLogo className="h-10 w-48" />
          <Text className="mt-1 text-center text-[11px] font-medium tracking-[1px] text-ink">
            Yamani Speciality Coffee
          </Text>
          <Text className="mt-4 text-center text-2xl font-semibold text-canvas">Home</Text>
          <Text className="mt-1 text-center text-sm leading-5 text-canvas">
            Your Moka & Co{'\n'}partner account.
          </Text>
        </View>

        <Button
          mode="contained"
          style={styles.signOut}
          contentStyle={styles.signOutContent}
          labelStyle={styles.signOutLabel}
          onPress={() => navigation.replace('Login')}
        >
          Sign out
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  signOut: {
    marginBottom: 32,
    borderRadius: 16,
    borderWidth: 0,
  },
  signOutContent: {
    height: 44,
  },
  signOutLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
