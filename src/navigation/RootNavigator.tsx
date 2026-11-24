import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountScreen } from '../screens/account/AccountScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TicketScreen } from '../screens/home/TicketScreen';
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import type { RootStackParamList } from './types';

export type { RootStackParamList };

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Products" component={ProductsScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Ticket" component={TicketScreen} />
    </Stack.Navigator>
  );
}
