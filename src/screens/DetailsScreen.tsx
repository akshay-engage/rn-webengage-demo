import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCart} from '../context/CartContext';
import {useTheme} from '../theme/useTheme';
import {appConfig, formatPrice, getProductById} from '../data/catalog';
import PrimaryButton from '../components/PrimaryButton';
import type {RootStackScreenProps} from '../navigation/types';

export default function DetailsScreen({
  route,
  navigation,
}: RootStackScreenProps<'Details'>) {
  const theme = useTheme();
  const {addToCart} = useCart();
  const product = getProductById(route.params.productId);

  if (!product) {
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: theme.background}]}>
        <View style={styles.center}>
          <Text style={{color: theme.text}}>Item not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onPrimaryAction = () => {
    addToCart(product);
    navigation.navigate('Tabs', {screen: 'Cart'});
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safe, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{uri: product.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <Text style={[styles.category, {color: theme.textMuted}]}>
            {product.category}
          </Text>
          <Text style={[styles.title, {color: theme.text}]}>
            {product.title}
          </Text>
          <Text style={[styles.price, {color: theme.primary}]}>
            {formatPrice(product.price)}
          </Text>
          <Text style={[styles.description, {color: theme.textMuted}]}>
            {product.description}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, {borderTopColor: theme.border}]}>
        <PrimaryButton
          label={appConfig.primaryActionLabel}
          onPress={onPrimaryAction}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  content: {paddingBottom: 24},
  image: {width: '100%', height: 240, backgroundColor: '#00000010'},
  body: {padding: 20},
  category: {fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5},
  title: {fontSize: 24, fontWeight: '800', marginTop: 6},
  price: {fontSize: 22, fontWeight: '800', marginTop: 10},
  description: {fontSize: 15, lineHeight: 22, marginTop: 16},
  footer: {padding: 16, borderTopWidth: 1},
});
