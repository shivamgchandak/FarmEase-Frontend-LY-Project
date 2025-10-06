// components/buyer/homePage/DealsOfTheDay/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { consumerApi } from '@/api/consumerApi';
import CardModal from '../../CardModal';

const DealsOfTheDay = () => {
  const router = useRouter();
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUrgentProducts();
  }, []);

  const fetchUrgentProducts = async () => {
    try {
      setLoading(true);
      const response = await consumerApi.getUrgentProducts();
      setDeals(response.data.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
      </View>
    );
  }

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

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.cardsContainer}
      >
        {deals.map((item) => (
          <CardModal
            key={item._id}
            image={item.images?.[0]?.url ? { uri: item.images[0].url } : require('@/assets/TestImages/TestImage.png')}
            name={item.name}
            rating={item.rating?.average?.toString() || "0"}
            price={`₹${item.price}`}
            priceBefore={item.originalPrice ? `₹${item.originalPrice}` : undefined}
            discount={item.discountPercent ? `${item.discountPercent}%` : undefined}
            description={item.description}
            maxLength={50}
            farmName={item.farmerName}
            location={item.farmerLocation?.city || ""}
            buttonText="Add"
            showWishlist={false}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titleContainer:{
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
  viewMoreButton:{
    height: 8,
    width: 15,
    transform: [{ rotate: '-90deg' }],
    marginBottom:5,
    marginRight: 10,
  },
  cardsContainer: {
    paddingTop: 10,
    paddingRight: 10,
    gap: 10,
  },
});

export default DealsOfTheDay;