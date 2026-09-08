import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';
import {useTheme} from '../theme/useTheme';
import {appConfig} from '../data/catalog';
import type {RootStackParamList, TabParamList} from './types';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import DetailsScreen from '../screens/DetailsScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const theme = useTheme();
  const {itemCount} = useCart();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: theme.card},
        headerTitleStyle: {color: theme.text},
        headerShadowVisible: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {backgroundColor: theme.card, borderTopColor: theme.border},
        tabBarIcon: ({color, size}) => {
          const icons: Record<keyof TabParamList, string> = {
            Home: 'home-outline',
            Cart: 'cart-outline',
            Account: 'person-outline',
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: appConfig.title}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
        }}
      />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const theme = useTheme();
  const {isAuthenticated, hydrating} = useAuth();

  const navTheme = theme.isDark ? DarkTheme : DefaultTheme;

  if (hydrating) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.background,
        }}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: theme.card},
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.primary,
          headerShadowVisible: false,
          contentStyle: {backgroundColor: theme.background},
        }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Details"
              component={DetailsScreen}
              options={{title: 'Details'}}
            />
          </>
        ) : (
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
