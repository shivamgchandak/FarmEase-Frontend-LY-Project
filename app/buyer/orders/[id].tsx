// app/buyer/orders/[id].tsx
import BuyerButton from '@/components/buyer/buyerButton';
import { useOrderStore } from '@/store/orderStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const OrderDetailPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedOrder, fetchOrderById, cancelOrder, isLoading } = useOrderStore();

  useEffect(() => {
    if (id) {
      fetchOrderById(id as string);
    }
  }, [id]);

  const handleCancelOrder = () => {
    if (!selectedOrder) return;

    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelOrder(selectedOrder._id, 'Changed my mind');
              Alert.alert('Success', 'Order cancelled successfully');
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel order');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'shipped':
        return '#9C27B0';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  if (isLoading || !selectedOrder) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  const canCancel = ['pending', 'confirmed'].includes(
    selectedOrder.orderStatus.toLowerCase()
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Order Status */}
        <View style={styles.statusCard}>
          <Text style={styles.orderId}>Order #{selectedOrder.orderId}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(selectedOrder.orderStatus) },
            ]}
          >
            <Text style={styles.statusText}>
              {selectedOrder.orderStatus.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.orderDate}>
            Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {selectedOrder.items.map((item: any, index: number) => (
            <View key={index} style={styles.itemCard}>
              <Image
                source={
                  item.imageUrl
                    ? { uri: item.imageUrl }
                    : require('@/assets/TestImages/TestImage.png')
                }
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <Text style={styles.itemFarmer}>by {item.farmerName}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>
                    ₹{(item.pricePerUnit * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>
              {selectedOrder.shippingAddress.street}
            </Text>
            <Text style={styles.addressText}>
              {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
            </Text>
            <Text style={styles.addressText}>
              {selectedOrder.shippingAddress.pincode}
            </Text>
            <Text style={styles.addressText}>
              {selectedOrder.shippingAddress.country}
            </Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Method:</Text>
              <Text style={styles.paymentValue}>
                {selectedOrder.paymentDetails?.method === 'cod'
                  ? 'Cash on Delivery'
                  : 'Online Payment'}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Payment Status:</Text>
              <Text
                style={[
                  styles.paymentValue,
                  {
                    color:
                      selectedOrder.paymentDetails?.status === 'paid'
                        ? '#4CAF50'
                        : '#FF9800',
                  },
                ]}
              >
                {selectedOrder.paymentDetails?.status?.toUpperCase() || 'PENDING'}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                ₹{selectedOrder.totalAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee:</Text>
              <Text style={styles.summaryValue}>₹0.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>
                ₹{selectedOrder.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Cancel Button */}
        {canCancel && (
          <View style={styles.buttonContainer}>
            <BuyerButton
              height={50}
              backgroundColor="#fff"
              borderColor="#FF5722"
              borderRadius={8}
              text="Cancel Order"
              textStyle={styles.cancelButtonText}
              onPress={handleCancelOrder}
            />
          </View>
        )}
      </View>
    </ScrollView>
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
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  orderId: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  itemFarmer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '700',
    color: '#169E1C',
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 4,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  paymentValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F1F1F',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  summaryValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1F',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    color: '#169E1C',
  },
  buttonContainer: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
});

export default OrderDetailPage;