import BuyerButton from '@/components/buyer/buyerButton';
import CardModal from '@/components/buyer/CardModal';
import CountdownTimer from '@/components/buyer/countdownTimer';
import dealsData from "@/TestData/DealsOfTheDay/data.json";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const buyerDealsOfTheDayPage = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const dealsToShow = dealsData.slice(0, visibleCount);

  const target = new Date();
  target.setHours(23, 59, 59, 999); 

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, dealsData.length));
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContent}>
        <Text style={styles.containersubtitle}>
          Start your day with fresh savings! These prices are valid until 11:59 PM tonight.
        </Text>

        <CountdownTimer targetTime={target}/>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.cardsContainer}
          style={styles.cards}
        >
          {dealsToShow.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.cardWrapper}>
              <CardModal
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
            </View>
          ))}

          {visibleCount < dealsData.length && ( 
            <BuyerButton
                height={50}
                width={340}
                backgroundColor='#169E1C'
                borderColor='#169E1C'
                borderRadius={3}
                text='Load More'
                textStyle={{ color: "#fff", fontSize: 22, fontWeight: '500', fontFamily: 'Poppins-Medium' }}
                onPress={loadMore}
            />
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    gap: 10,
    alignItems: "center",
  },
  containersubtitle:{
    textAlign: 'center',
    color: '#1F1F1F80',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 10,
  },
  cards:{
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 10,
  },
})

export default buyerDealsOfTheDayPage;
