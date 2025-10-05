import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface FarmLocationProps {
  location: string;
  farmName: string;
}

const FarmLocation: React.FC<FarmLocationProps> = ({ location, farmName }) => {
  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.containerLocation}>
          <Image
            source={require('@/assets/images/RedLocationPin.png')}
            style={styles.containerLocationImage}
          />
          <Text style={styles.containerLocationText}>{location}</Text>
        </View>
      )}

      {farmName && (
        <View style={styles.containerLocation}>
          <Image
            source={require('@/assets/images/BuyerNavbarFarmer.png')}
            style={styles.containerLocationImage}
          />
          <Text style={styles.containerLocationText}>{farmName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      alignItems:'flex-start',
    },
    containerLocation:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        gap:5,
    },
    containerLocationImage:{
        height:10,
        width:10,
    },
    containerLocationText:{
        fontSize: 10,
        fontWeight: "400",
        color: "#1F1F1FA6",
        fontFamily: "Poppins-Regular"
    },
})

export default FarmLocation