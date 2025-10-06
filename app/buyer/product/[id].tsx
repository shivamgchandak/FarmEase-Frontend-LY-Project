// app/buyer/products/[id].tsx
import BuyerButton from '@/components/buyer/buyerButton';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { selectedProduct, fetchProductById, isLoading, error } = useProductStore();
  const { addToCart, isLoading: cartLoading } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductById(id as string);
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      await addToCart({
        productId: selectedProduct._id,
        productName: selectedProduct.name,
        farmerId: selectedProduct.farmerId,
        farmerName: selectedProduct.farmerName,
        quantity,
        pricePerUnit: selectedProduct.price,
        imageUrl: selectedProduct.images[0]?.url,
        isUrgent: selectedProduct.isUrgent,
      });
      Alert.alert('Success', 'Product added to cart!');
    } catch (err) {
      Alert.alert('Error', 'Failed to add to cart');
    }
  };

  const incrementQuantity = () => {
    if (selectedProduct && quantity < selectedProduct.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (error || !selectedProduct) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
        <BuyerButton
          height={50}
          width={200}
          backgroundColor="#169E1C"
          borderColor="#169E1C"
          borderRadius={8}
          text="Go Back"
          textStyle={styles.buttonText}
          onPress={() => router.back()}
        />
      </View>
    );
  }

  const primaryImage = selectedProduct.images.find(img => img.isPrimary) || selectedProduct.images[0];
  const discount = selectedProduct.discountPercent;
  const savings = selectedProduct.originalPrice 
    ? selectedProduct.originalPrice - selectedProduct.price 
    : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Gallery */}
      <View style={styles.imageContainer}>
        <Image
          source={primaryImage?.url ? { uri: primaryImage.url } : require('@/assets/TestImages/TestImage.png')}
          style={styles.mainImage}
        />
        {selectedProduct.isUrgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>🔥 URGENT SALE</Text>
          </View>
        )}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{selectedProduct.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Image 
            source={require('@/assets/images/RatingStar.png')} 
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>
            {selectedProduct.rating.average.toFixed(1)} ({selectedProduct.rating.count} reviews)
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{selectedProduct.price}</Text>
          <Text style={styles.unit}>/{selectedProduct.unit}</Text>
          {selectedProduct.originalPrice && (
            <Text style={styles.originalPrice}>₹{selectedProduct.originalPrice}</Text>
          )}
        </View>

        {savings > 0 && (
          <Text style={styles.savings}>You save ₹{savings.toFixed(2)}</Text>
        )}

        {/* Farmer Info */}
        <TouchableOpacity 
          style={styles.farmerContainer}
          onPress={() => router.push(`/buyer/specific-farmer/${selectedProduct.farmerId}`)}
        >
          <Image 
            source={require('@/assets/images/BuyerNavbarFarmer.png')} 
            style={styles.farmerIcon}
          />
          <View>
            <Text style={styles.farmerName}>{selectedProduct.farmerName}</Text>
            <Text style={styles.location}>
              {selectedProduct.farmerLocation.city}, {selectedProduct.farmerLocation.state}
            </Text>
          </View>
          <Image 
            source={require('@/assets/images/leftBackArrow.png')} 
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this product</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>

        {/* Stock & Expiry */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Stock Available</Text>
            <Text style={styles.detailValue}>
              {selectedProduct.stock} {selectedProduct.unit}
            </Text>
          </View>
          {selectedProduct.expiryDate && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Best Before</Text>
              <Text style={styles.detailValue}>
                {new Date(selectedProduct.expiryDate).toLocaleDateString()}
              </Text>
            </View>
          )}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>
              {typeof selectedProduct.category === 'string' 
                ? selectedProduct.category 
                : selectedProduct.category?.name || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          {cartLoading ? (
            <ActivityIndicator size="large" color="#169E1C" />
          ) : (
            <BuyerButton
              height={55}
            //   width="100%"
              backgroundColor="#169E1C"
              borderColor="#169E1C"
              borderRadius={8}
              text={`Add to Cart - ₹${(selectedProduct.price * quantity).toFixed(2)}`}
              textStyle={styles.addButtonText}
              onPress={handleAddToCart}
            />
          )}
        </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#c62828',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  urgentBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  urgentText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#169E1C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 5,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  ratingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    fontWeight: '700',
    color: '#169E1C',
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F1F1FA6',
    marginLeft: 5,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  savings: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FF5722',
    marginBottom: 15,
  },
  farmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
    gap: 10,
  },
  farmerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  farmerName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F1F',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1F1F1FA6',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    marginLeft: 'auto',
    transform: [{ rotate: '180deg' }],
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F1FA6',
  },
  detailValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F1F1F',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F1F',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 35,
    height: 35,
    backgroundColor: '#169E1C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  quantityValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1F1F1F',
    minWidth: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
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

export default ProductDetailPage;