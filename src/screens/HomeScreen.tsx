import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../theme/useTheme';
import {appConfig, formatPrice, products, type Product} from '../data/catalog';
import type {TabScreenProps} from '../navigation/types';

export default function HomeScreen({navigation}: TabScreenProps<'Home'>) {
  const theme = useTheme();
  const {name, isGuest} = useAuth();

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Details', {productId: item.id})}
      style={[styles.card, {backgroundColor: theme.card, borderColor: theme.border}]}>
      <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={[styles.category, {color: theme.textMuted}]}>
          {item.category}
        </Text>
        <Text numberOfLines={2} style={[styles.cardTitle, {color: theme.text}]}>
          {item.title}
        </Text>
        <Text style={[styles.price, {color: theme.primary}]}>
          {formatPrice(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.safe, {backgroundColor: theme.background}]}>
      <FlatList
        data={products}
        keyExtractor={p => p.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.welcomeRow}>
              <Text style={[styles.welcome, {color: theme.text}]}>
                Welcome,
                {name ? ` ${name}` : ''}
              </Text>
              {isGuest && (
                <View style={[styles.badge, {backgroundColor: theme.accent}]}>
                  <Text style={styles.badgeText}>Guest</Text>
                </View>
              )}
            </View>
            <Text style={[styles.listTitle, {color: theme.text}]}>
              {appConfig.listTitle}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  listContent: {padding: 16, paddingBottom: 32},
  header: {marginBottom: 12},
  welcomeRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  welcome: {fontSize: 24, fontWeight: '700'},
  badge: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {color: '#1A1A1A', fontWeight: '700', fontSize: 12},
  listTitle: {fontSize: 18, fontWeight: '600'},
  column: {gap: 12},
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {width: '100%', height: 110, backgroundColor: '#00000010'},
  cardBody: {padding: 12},
  category: {fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5},
  cardTitle: {fontSize: 15, fontWeight: '600', marginTop: 4, minHeight: 38},
  price: {fontSize: 16, fontWeight: '800', marginTop: 6},
});
