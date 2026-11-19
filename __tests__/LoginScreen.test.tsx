import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from '../src/screens/auth/LoginScreen';
import { paperTheme } from '../src/theme/paperTheme';

test('renders the login screen', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <LoginScreen />
        </PaperProvider>
      </SafeAreaProvider>,
    );
  });
});
