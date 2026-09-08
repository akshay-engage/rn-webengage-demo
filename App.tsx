/**
 * Recharge Demo — data-driven mobile recharge / bill-payment demo.
 *
 * All user-facing wording comes from src/data/catalog.json. Screens are
 * domain-agnostic so the app can be repurposed by editing only the JSON.
 */
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthProvider} from './src/context/AuthContext';
import {CartProvider} from './src/context/CartContext';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  const isDark = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <AuthProvider>
          <CartProvider>
            <RootNavigator />
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
