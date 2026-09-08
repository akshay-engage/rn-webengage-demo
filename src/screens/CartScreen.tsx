import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCart, type CartLine} from '../context/CartContext';
import {useTheme} from '../theme/useTheme';
import {appConfig, formatPrice} from '../data/catalog';
import PrimaryButton from '../components/PrimaryButton';

export default function CartScreen() {
  const theme = useTheme();
  const {lines, total, increment, decrement, clear} = useCart();

  const onCheckout = () => {
    Alert.alert(appConfig.orderSuccessMessage, undefined, [
      {text: 'OK', onPress: clear},
    ]);
  };

  if (lines.length === 0) {
    return (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={[styles.safe, {backgroundColor: theme.background}]}>
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={64} color={theme.textMuted} />
          <Text style={[styles.emptyTitle, {color: theme.text}]}>
            {appConfig.emptyCartMessage}
          </Text>
          <Text style={[styles.emptyHint, {color: theme.textMuted}]}>
            {appConfig.emptyCartHint}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({item}: {item: CartLine}) => (
    <View
      style={[styles.card, {backgroundColor: theme.card, borderColor: theme.border}]}>
      <Image source={{uri: item.product.image}} style={styles.thumb} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={[styles.title, {color: theme.text}]}>
          {item.product.title}
        </Text>
        <Text style={[styles.linePrice, {color: theme.primary}]}>
          {formatPrice(item.product.price * item.quantity)}
        </Text>
        <View style={styles.stepper}>
          <TouchableOpacity
            accessibilityLabel="Decrease quantity"
            onPress={() => decrement(item.product.id)}
            style={[styles.stepBtn, {borderColor: theme.border}]}>
            <Ionicons name="remove" size={18} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.qty, {color: theme.text}]}>{item.quantity}</Text>
          <TouchableOpacity
            accessibilityLabel="Increase quantity"
            onPress={() => increment(item.product.id)}
            style={[styles.stepBtn, {borderColor: theme.border}]}>
            <Ionicons name="add" size={18} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safe, {backgroundColor: theme.background}]}>
      <FlatList
        data={lines}
        keyExtractor={l => l.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={[styles.footer, {borderTopColor: theme.border}]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, {color: theme.textMuted}]}>Total</Text>
          <Text style={[styles.totalValue, {color: theme.text}]}>
            {formatPrice(total)}
          </Text>
        </View>
        <PrimaryButton label={appConfig.checkoutLabel} onPress={onCheckout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  listContent: {padding: 16},
  empty: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32},
  emptyTitle: {fontSize: 18, fontWeight: '700', marginTop: 16},
  emptyHint: {fontSize: 14, textAlign: 'center', marginTop: 8},
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  thumb: {width: 76, height: 76, borderRadius: 10, backgroundColor: '#00000010'},
  info: {flex: 1, marginLeft: 12},
  title: {fontSize: 15, fontWeight: '600'},
  linePrice: {fontSize: 16, fontWeight: '800', marginTop: 4},
  stepper: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {fontSize: 16, fontWeight: '700', minWidth: 36, textAlign: 'center'},
  footer: {padding: 16, borderTopWidth: 1},
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {fontSize: 15},
  totalValue: {fontSize: 22, fontWeight: '800'},
});
