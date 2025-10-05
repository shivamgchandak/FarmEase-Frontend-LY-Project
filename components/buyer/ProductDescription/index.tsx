import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProductDescriptionProps {
  description?: string;
  maxLength?: number;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  maxLength,
}) => {
  if (!description) return null;

  const displayText =
    maxLength !== undefined && description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <View style={styles.container}>
      <Text style={styles.containerDescriptionText}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerDescriptionText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#1F1F1F8C",
    fontFamily: "Poppins-Regular",
  },
});

export default ProductDescription;