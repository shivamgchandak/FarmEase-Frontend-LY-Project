import BuyerButton from '@/components/buyer/buyerButton';
import CardModal from '@/components/buyer/CardModal';
import dealsData from "@/TestData/CategoriesProducts/data.json";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const buyerWishlistPage = () => {

    const [visibleCount, setVisibleCount] = useState(8);
    const dealsToShow = dealsData.slice(0, visibleCount);

    const loadMore = () => {
      setVisibleCount(prev => Math.min(prev + 4, dealsData.length));
    };

  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.containerTitle}>Your Favourites</Text>

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
                description={item.description}
                maxLength={50}
                farmName={item.farmName}
                location={item.location}
                buttonText="Add"
                showWishlist={true}
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

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{

    },
    containerTitle:{
        textAlign: 'center',
        color: '#1F1F1F',
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 22,
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

export default buyerWishlistPage