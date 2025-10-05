import data from '@/TestData/Farmers/data.json'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BuyerButton from '../../buyerButton'
import CardModal from '../../CardModal'

const FarmersNearYou = () => {
  const farmersToShow = data.slice(0, 4)

  const groupedFarmers = []
  for (let i = 0; i < farmersToShow.length; i += 2) {
    groupedFarmers.push(farmersToShow.slice(i, i + 2))
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Farmers Near You</Text>

      <View style={styles.productsContainer}>
        {groupedFarmers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <View key={item.id} style={styles.productCardWrapper}>
                <CardModal
                  image={require('@/assets/TestImages/TestImage.png')}
                  name={item.name.split(" ")[0]} 
                  rating={item.rating.toString()}
                  description={item.description}
                  maxLength={50}
                  farmName={item.farmName}
                  location={item.location}
                  showWishlist={false}
                  buttonText="View"
                />
              </View>
            ))}
          </View>
        ))}
      </View>

      <BuyerButton
        height={40}
  
        backgroundColor="transparent"
        borderColor="#1F1F1F52"
        borderRadius={3}
        text="View More"
        textStyle={{
          color: "#1F1F1FA6",
          fontSize: 20,
          fontWeight: '500',
          fontFamily: 'Poppins-Medium',
        }}
        onPress={() => console.log('View More clicked')}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1F1F1F',
    fontFamily: 'Poppins-Medium',
  },
  productsContainer: {
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 20
  },
  productCardWrapper: {},
})

export default FarmersNearYou
