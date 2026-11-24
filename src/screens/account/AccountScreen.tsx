import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { PartnerScreen } from '../../components/PartnerScreen';
import type { RootStackParamList } from '../../navigation/types';

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export function AccountScreen({ navigation }: AccountScreenProps) {
  return (
    <PartnerScreen title="Account" tab="Account">
      <Button
        mode="contained"
        style={styles.signOut}
        contentStyle={styles.signOutContent}
        labelStyle={styles.signOutLabel}
        onPress={() => navigation.replace('Login')}
      >
        Sign out
      </Button>
    </PartnerScreen>
  );
}

const styles = StyleSheet.create({
  signOut: {
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
