import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountsScreen } from '../screens/accounts/AccountsScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { DocumentsScreen } from '../screens/documents/DocumentsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TicketScreen } from '../screens/home/TicketScreen';
import { MarketingAssetsScreen } from '../screens/marketing/MarketingAssetsScreen';
import { TicketsScreen } from '../screens/tickets/TicketsScreen';
import type { RootStackParamList } from './types';

export type { RootStackParamList };

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Tickets" component={TicketsScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Accounts" component={AccountsScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Documents" component={DocumentsScreen} options={{ animation: 'fade' }} />
      <Stack.Screen
        name="MarketingAssets"
        component={MarketingAssetsScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen name="Ticket" component={TicketScreen} />
    </Stack.Navigator>
  );
}
