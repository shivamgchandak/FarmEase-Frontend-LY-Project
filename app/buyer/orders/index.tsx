// app/buyer/orders/index.tsx
import BuyerButton from '@/components/buyer/buyerButton';
import { useOrderStore } from '@/store/orderStore';
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

const OrdersPage = () => {
  const router = useRouter();
  const { orders, fetchOrders, cancelOrder, isLoading } = useOrderStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'completed'>('all');

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const handleCancelOrder = (orderId: string) => {
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
              await cancelOrder(orderId, 'Changed my mind');
              Alert.alert('Success', 'Order cancelled successfully');
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

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'pending') {
      return ['pending', 'confirmed', 'shipped'].includes(order.orderStatus.toLowerCase());
    }
    if (selectedTab === 'completed') {
      return ['delivered', 'cancelled'].includes(order.orderStatus.toLowerCase());
    }
    return true;
  });

  if (isLoading && orders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('@/assets/images/EmptyOrders.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>No orders yet</Text>
        <Text style={styles.emptyText}>
          Start shopping for fresh products from local farmers!
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'pending' && styles.activeTab]}
          onPress={() => setSelectedTab('pending')}
        >
          <Text style={[styles.tabText, selectedTab === 'pending' && styles.activeTabText]}>
            Pending
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={[styles.tabText, selectedTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.map((order) => (
          <TouchableOpacity
            key={order._id}
            style={styles.orderCard}
            onPress={() => router.push(`/buyer/orders/${order._id}`)}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{order.orderId}</Text>
                <Text style={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Text>
              </View>
              
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.orderStatus) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(order.orderStatus)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.orderItems}>
              <Text style={styles.itemsLabel}>
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </Text>
              <Text style={styles.orderAmount}>₹{order.totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.orderFooter}>
              <TouchableOpacity
                onPress={() => router.push(`/buyer/orders/${order._id}`)}
              >
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>

              {['pending', 'confirmed'].includes(order.orderStatus.toLowerCase()) && (
                <TouchableOpacity
                  onPress={() => handleCancelOrder(order._id)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    gap: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#169E1C',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  activeTabText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  orderItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  orderAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '700',
    color: '#169E1C',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetails: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#169E1C',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FF5722',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default OrdersPage;