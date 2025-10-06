import CategoriesAllProducts from '@/components/buyer/homePage/CategoriesAllProducts';
import DealsOfTheDay from '@/components/buyer/homePage/DealsOfTheDay';
import FarmersNearYou from '@/components/buyer/homePage/FarmersNearYou';
import SearchBar from '@/components/buyer/homePage/Searchbar';
import SeasonalProductAlert from '@/components/buyer/homePage/SeasonalProductAlert';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BuyerHomePage = () => {
  const { fetchProducts, fetchUrgentProducts, isLoading, error } = useProductStore();
  const { fetchCart } = useCartStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const loadData = useCallback(async () => {
    try {
      await Promise.all([
        fetchProducts(),
        fetchUrgentProducts(),
        fetchCart(),
      ]);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  }, [fetchProducts, fetchUrgentProducts, fetchCart]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
        <Text style={styles.loadingText}>Loading fresh products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#169E1C']}
              tintColor="#169E1C"
            />
          }
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <SeasonalProductAlert />
          <DealsOfTheDay />
          <SearchBar />
          <CategoriesAllProducts />
          <FarmersNearYou />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#169E1C',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: '#c62828',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default BuyerHomePage;