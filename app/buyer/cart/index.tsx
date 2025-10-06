// app/buyer/cart/index.tsx
import BuyerButton from '@/components/buyer/buyerButton';
import { useCartStore } from '@/store/cartStore';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CartPage = () => {
  const router = useRouter();
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart, isLoading } = useCartStore();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const handleQuantityChange = async (itemId: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      await updateCartItem(itemId, newQty);
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFromCart(itemId);
            } catch (error) {
              Alert.alert('Error', 'Failed to remove item');
            }
          },
        },
      ]
    );
  };

  const handleClearCart = async () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCart();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cart');
            }
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout');
      return;
    }
    router.push('/buyer/checkout');
  };

  if (isLoading && !cart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('@/assets/images/EmptyCart.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Add fresh products from local farmers to get started!
        </Text>
        <BuyerButton
          height={50}
          width={250}
          backgroundColor="#169E1C"
          borderColor="#169E1C"
          borderRadius={8}
          text="Browse Products"
          textStyle={styles.buttonText}
          onPress={() => router.push('/buyer')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {cart.items.map((item) => (
          <View key={item._id} style={styles.cartItem}>
            <Image
              source={
                item.imageUrl 
                  ? { uri: item.imageUrl }
                  : require('@/assets/TestImages/TestImage.png')
              }
              style={styles.productImage}
            />
            
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.farmerName}>{item.farmerName}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{item.pricePerUnit}</Text>
                {item.isUrgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>URGENT</Text>
                  </View>
                )}
              </View>

              <View style={styles.itemFooter}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item._id, item.quantity, -1)}
                    disabled={updatingItems.has(item._id)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  
                  {updatingItems.has(item._id) ? (
                    <ActivityIndicator size="small" color="#169E1C" />
                  ) : (
                    <Text style={styles.quantity}>{item.quantity}</Text>
                  )}
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item._id, item.quantity, 1)}
                    disabled={updatingItems.has(item._id)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  onPress={() => handleRemoveItem(item._id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{cart.totalAmount.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.itemCount}>
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
        </Text>

        <BuyerButton
          height={55}
          width="100%"
          backgroundColor="#169E1C"
          borderColor="#169E1C"
          borderRadius={8}
          text="Proceed to Checkout"
          textStyle={styles.checkoutButtonText}
          onPress={handleCheckout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '600',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  clearText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FF5722',
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    flexDirection: 'row',
    gap: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  farmerName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '700',
    color: '#169E1C',
  },
  urgentBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  urgentText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#169E1C',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F1F',
    minWidth: 25,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  removeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FF5722',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1F1F1F',
  },
  totalAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '700',
    color: '#169E1C',
  },
  itemCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
    marginBottom: 15,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default CartPage;