import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { PartnerScreen } from '../../components/PartnerScreen';
import type { RootStackParamList } from '../../navigation/types';

type AccountsScreenProps = NativeStackScreenProps<RootStackParamList, 'Accounts'>;

export function AccountsScreen({ navigation }: AccountsScreenProps) {
  return (
    <PartnerScreen title="Accounts" tab="Accounts">
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
