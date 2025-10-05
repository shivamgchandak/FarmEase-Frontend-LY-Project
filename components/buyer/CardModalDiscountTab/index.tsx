import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DiscountTabProps {
  discount?: string; // optional
}

const DiscountTab: React.FC<DiscountTabProps> = ({ discount }) => {
  if (!discount) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>{discount}</Text>
      <Text style={styles.containerText}>off</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height: 40,
        width: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED543B',
    },
    containerText:{
        fontSize: 12,
        fontWeight: "600",
        color: "#ffffff",
        fontFamily: "Poppins-SemiBold"
    },
})

export default DiscountTab