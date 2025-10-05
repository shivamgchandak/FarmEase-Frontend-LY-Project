import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ProductNameAndRatingProps {
  name: string;
  rating: string;
}

const ProductNameAndRating: React.FC<ProductNameAndRatingProps> = ({ name, rating }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.containerName}>{name}</Text>
      <View style={styles.containerRating}>
        <Text style={styles.containerRatingValue}>{rating}</Text>
        <Image
          source={require('@/assets/images/RatingStar.png')}
          style={styles.containerRatingImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    containerName:{
        fontSize: 16,
        fontWeight: "500",
        color: "#005603",
        fontFamily: "Poppins-Medium",
    },
    containerRating:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    containerRatingValue:{
        fontSize: 12,
        fontWeight: "400",
        color: "#1F1F1FA6",
        fontFamily: "Poppins-Regular"
    },
    containerRatingImage:{
        height:12,
        width:12,
        objectFit: 'contain',
    },
})

export default ProductNameAndRating