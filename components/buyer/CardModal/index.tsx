import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import BuyerButton from '../buyerButton';
import DiscountTab from '../CardModalDiscountTab';
import FarmLocation from '../FarmLocation';
import ProductDescription from '../ProductDescription';
import ProductNameAndRating from '../ProductNameAndRating';
import ProductPrice from '../ProductPrice';
import WishlistButton from '../wishlistButton';
import { useCartStore } from '@/store/cartStore';

interface CardModalProps {
  product?: any; // Product from API
  image?: any; // Fallback local image
  name?: string;
  rating?: string;
  price?: string;
  priceBefore?: string;
  discount?: string;
  showWishlist: boolean;
  description?: string;
  maxLength?: number;
  buttonText: string;
  location?: string;
  farmName?: string;
  onPress?: () => void;
}

const CardModal: React.FC<CardModalProps> = ({
  product,
  image,
  name,
  rating,
  price,
  priceBefore,
  discount,
  showWishlist,
  description,
  maxLength,
  buttonText,
  location,
  farmName,
  onPress,
}) => {
  const { addToCart, isLoading } = useCartStore();
  const [adding, setAdding] = useState(false);

  // Use product data if available, otherwise use props
  const productData = product || {
    name,
    rating: { average: parseFloat(rating || '0') },
    price: parseFloat(price?.replace(/[^\d.]/g, '') || '0'),
    originalPrice: parseFloat(priceBefore?.replace(/[^\d.]/g, '') || '0'),
    discountPercent: parseFloat(discount?.replace(/[^\d]/g, '') || '0'),
    description,
    farmerLocation: { city: location },
    farmerName: farmName,
  };

  const handleAddToCart = async () => {
    if (!product) {
      Alert.alert('Error', 'Product information not available');
      return;
    }

    setAdding(true);
    try {
      await addToCart({
        productId: product._id,
        productName: product.name,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        quantity: 1,
        pricePerUnit: product.price,
        imageUrl: product.images?.[0]?.url,
        isUrgent: product.isUrgent,
        expiryDate: product.expiryDate,
      });

      Alert.alert('Success', `${product.name} added to cart!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleButtonPress = () => {
    if (buttonText === 'Add') {
      handleAddToCart();
    } else if (onPress) {
      onPress();
    }
  };

  const imageSource = product?.images?.[0]?.url 
    ? { uri: product.images[0].url }
    : image || require('@/assets/TestImages/TestImage.png');

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View>
          <Image source={imageSource} style={styles.containerTopImage} />
        </View>

        {showWishlist && (
          <View style={styles.containerTopWishlist}>
            <WishlistButton productId={product?._id} />
          </View>
        )}

        {productData.discountPercent > 0 && (
          <View style={styles.containerTopDiscount}>
            <DiscountTab discount={`${productData.discountPercent}%`} />
          </View>
        )}

        <View style={styles.containerTopButton}>
          <BuyerButton
            height={30}
            width={80}
            backgroundColor={adding || isLoading ? '#ccc' : '#FFFFFF'}
            borderColor="#169E1C"
            borderRadius={7}
            text={adding || isLoading ? 'Adding...' : buttonText}
            textStyle={{ 
              color: "#169E1C", 
              fontSize: 14, 
              fontWeight: '400', 
              fontFamily: 'Poppins-Regular' 
            }}
            onPress={handleButtonPress}
          />
        </View>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.containerBottomPriceTab}>
          <ProductPrice 
            price={`₹${productData.price}`}
            priceBefore={productData.originalPrice ? `₹${productData.originalPrice}` : undefined}
          />
        </View>

        <View style={styles.containerBottomNameAndRating}>
          <ProductNameAndRating 
            name={productData.name}
            rating={productData.rating?.average?.toString() || '0'}
          />
        </View>

        {productData.description && (
          <View style={styles.containerBottomDescription}>
            <ProductDescription 
              description={productData.description}
              maxLength={maxLength}
            />
          </View>
        )}

        <View style={styles.containerBottomLocationTab}>
          <FarmLocation 
            location={productData.farmerLocation?.city || location || ''}
            farmName={productData.farmerName || farmName || ''}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderColor: "#9292921A",
    borderTopWidth: 1,
    height: 'auto',
    width: "100%",
    maxWidth: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.13 },
    shadowOpacity: 0.08,
    shadowRadius: 7.12,
    elevation: 2,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 4,
    gap: 10,
  },
  containerTop: {},
  containerTopWishlist: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  containerTopDiscount: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  containerTopImage: {
    height: 100,
    width: 140,
    borderRadius: 4,
  },
  containerTopButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
  },
  containerBottom: {
    gap: 3,
  },
  containerBottomPriceTab: {},
  containerBottomNameAndRating: {},
  containerBottomDescription: {},
  containerBottomLocationTab: {},
});

export default CardModal;