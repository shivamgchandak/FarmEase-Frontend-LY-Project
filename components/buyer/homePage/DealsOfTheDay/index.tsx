import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dealsData from '../../../../TestData/DealsOfTheDay/data.json';
import CardModal from '../../CardModal';

const DealsOfTheDay = () => {
  const router = useRouter();
  
  const dealsToShow = dealsData.slice(0, 4);
  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Deals of the Day</Text>
        <TouchableOpacity onPress={() => router.push("/buyerDealsOfTheDayPage")}>
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
        {dealsToShow.map((item) => (
          <CardModal
            key={item.id}
            image={require('@/assets/TestImages/TestImage.png')}
            name={item.name}
            rating={item.rating.toString()}
            price={item.price}
            priceBefore={item.priceBefore}
            discount={item.discount}
            description={item.description}
            maxLength={50}
            farmName={item.farmName}
            location={item.location}
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
