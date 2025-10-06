import { useProductStore } from '@/store/productStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardModal from '../../CardModal';

const DealsOfTheDay = () => {
  const router = useRouter();
  const { urgentProducts, isLoading } = useProductStore();
  
  const dealsToShow = urgentProducts.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Deals of the Day</Text>
        <TouchableOpacity onPress={() => router.push("/buyer/deals-of-day")}>
          <Image 
            source={require("@/assets/images/DropdownBottomArrow.png")} 
            style={styles.viewMoreButton} 
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#169E1C" />
        </View>
      ) : dealsToShow.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No deals available today</Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardsContainer}
        >
          {dealsToShow.map((product) => (
            <CardModal
              key={product._id}
              product={product}
              showWishlist={false}
              buttonText="Add"
              maxLength={50}
              onPress={() => router.push(`/buyer/product/${product._id}`)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1F1F1F',
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  viewMoreButton: {
    height: 8,
    width: 15,
    transform: [{ rotate: '-90deg' }],
    marginBottom: 5,
    marginRight: 10,
  },
  cardsContainer: {
    paddingTop: 10,
    paddingRight: 10,
    gap: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#999',
  },
});

export default DealsOfTheDay;