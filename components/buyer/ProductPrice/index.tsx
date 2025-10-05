import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProductPriceProps {
  price?: string;
  priceBefore?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, priceBefore }) => {
  return (
    <View style={styles.container}>
      {priceBefore && (
        <Text style={styles.containerPriceBefore}>{priceBefore}</Text>
      )}
      {price && (
        <Text style={styles.containerPrice}>
          <Text style={styles.containerPriceValue}>{price}</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    
  },
  containerPriceBefore:{
        fontSize: 12,
        fontWeight: "400",
        color: "#1F1F1FA6",
        fontFamily: "Poppins-Regular",
        textDecorationLine: 'line-through', 
    },
    containerPrice:{
        fontSize: 14,
        fontWeight: "400",
        color: "#1F1F1FA6",
        fontFamily: "Poppins-Regular",
    },
    containerPriceValue:{
        fontSize: 22,
        fontWeight: "600",
        color: "#ED543B",
        fontFamily: "Poppins-SemiBold"
    },
})

export default ProductPrice;