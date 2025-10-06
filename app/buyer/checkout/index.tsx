// app/buyer/checkout/index.tsx
import BuyerButton from '@/components/buyer/buyerButton';
import ProfileInput from '@/components/profileInput';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { cart, clearCart } = useCartStore();
  const { createOrder, createPaymentIntent, isLoading } = useOrderStore();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  }, [cart]);

  const handlePincodeChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setPincode(cleaned);
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  const validateForm = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }

    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return false;
    }

    if (!state.trim()) {
      Alert.alert('Error', 'Please enter your state');
      return false;
    }

    if (!pincode || pincode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return false;
    }

    if (!phone || phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    if (!cart || cart.items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    // Validate cart has totalAmount
    if (!cart.totalAmount || cart.totalAmount <= 0) {
      Alert.alert('Error', 'Invalid cart total amount');
      return;
    }

    try {
      const orderData = {
        items: cart.items.map(item => ({
          productId: item.productId,
          farmerId: item.farmerId,
          quantity: item.quantity,
          pricePerUnit: item.pricePerUnit,
        })),
        shippingAddress: {
          street: address,
          city,
          state,
          pincode,
          country: 'India',
        },
        contactPhone: phone,
        paymentMethod,
        totalAmount: cart.totalAmount,
      };

      console.log('Order Data:', orderData); // Debug log

      if (paymentMethod === 'online') {
        // Create payment intent
        const paymentIntent = await createPaymentIntent(cart.totalAmount);
        // In production, integrate with Stripe payment sheet here
        Alert.alert(
          'Payment',
          'Online payment integration coming soon. Please use COD for now.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Place order with COD
      const order = await createOrder(orderData);
      
      // Clear cart after successful order
      await clearCart();

      Alert.alert(
        'Order Placed!',
        `Your order has been placed successfully. Order ID: ${order.orderId}`,
        [
          {
            text: 'View Orders',
            onPress: () => router.replace('/buyer/orders'),
          },
        ]
      );
    } catch (error: any) {
      console.error('Order creation error:', error);
      const errorMessage = error.response?.data?.error 
        || error.response?.data?.message
        || error.message
        || 'Failed to place order. Please try again.';
      
      Alert.alert('Error', errorMessage);
    }
  };

  if (!cart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
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
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        
        <ProfileInput
          placeholder="Street Address"
          type="text"
          value={address}
          onChangeText={setAddress}
          height={80}
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <ProfileInput
              placeholder="City"
              type="text"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.halfWidth}>
            <ProfileInput
              placeholder="State"
              type="text"
              value={state}
              onChangeText={setState}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <ProfileInput
              placeholder="Pincode"
              type="number"
              value={pincode}
              onChangeText={handlePincodeChange}
            />
          </View>
          <View style={styles.halfWidth}>
            <ProfileInput
              placeholder="Phone Number"
              type="number"
              value={phone}
              onChangeText={handlePhoneChange}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <View style={styles.radioButton}>
              {paymentMethod === 'cod' && <View style={styles.radioButtonInner} />}
            </View>
            <View>
              <Text style={styles.paymentTitle}>Cash on Delivery</Text>
              <Text style={styles.paymentDesc}>Pay when you receive</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'online' && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod('online')}
          >
            <View style={styles.radioButton}>
              {paymentMethod === 'online' && <View style={styles.radioButtonInner} />}
            </View>
            <View>
              <Text style={styles.paymentTitle}>Online Payment</Text>
              <Text style={styles.paymentDesc}>Pay now (Coming Soon)</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        
        <View style={styles.summaryCard}>
          {cart.items.map((item, index) => (
            <View key={item._id} style={styles.summaryItem}>
              <Text style={styles.itemName}>
                {item.productName} x {item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                ₹{(item.pricePerUnit * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{cart.totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerAmount}>₹{cart.totalAmount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.placeOrderButton}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#169E1C" />
            ) : (
              <BuyerButton
                height={55}
                width={200}
                backgroundColor="#169E1C"
                borderColor="#169E1C"
                borderRadius={8}
                text="Place Order"
                textStyle={styles.buttonText}
                onPress={handlePlaceOrder}
              />
            )}
          </View>
        </View>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginTop: 20,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedPayment: {
    borderColor: '#169E1C',
    backgroundColor: '#F0F9F1',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#169E1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#169E1C',
  },
  paymentTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F1F',
  },
  paymentDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1F',
    flex: 1,
  },
  itemPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F1F1F',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  totalAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    color: '#169E1C',
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
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  footerAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    fontWeight: '700',
    color: '#169E1C',
  },
  placeOrderButton: {
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
});

export default CheckoutPage;