import data from '@/TestData/CategoriesProducts/data.json'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BuyerButton from '../../buyerButton'
import CardModal from '../../CardModal'

const categories = [
  { key: "vegetable", label: "Vegetable", icon: require('@/assets/images/CategoryVegetables.png'), color: "#169E1C" },
  { key: "fruits", label: "Fruits", icon: require('@/assets/images/CategoryFruits.png'), color: "#EF8E00" },
  { key: "dairy", label: "Dairy", icon: require('@/assets/images/CategoryDairy.png'), color: "#3B88C3" },
  { key: "grains", label: "Grains", icon: require('@/assets/images/CategoryGrains.png'), color: "#C1694F" },
]

const CategoriesAllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("vegetable")

  const filteredProducts = data.filter(item => item.category === selectedCategory)
  const productsToShow = filteredProducts.slice(0, 4)

  const groupedProducts = []
  for (let i = 0; i < productsToShow.length; i += 2) {
    groupedProducts.push(productsToShow.slice(i, i + 2))
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Categories</Text>

      <View style={styles.categoryButtonContainer}>
        {categories.map(cat => {
          const isActive = selectedCategory === cat.key
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryButton,
                {
                  borderColor: cat.color,
                  backgroundColor: isActive ? cat.color : '#F9F9F9',
                },
              ]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Image source={cat.icon} 
                    style={[
                        styles.categoryImage,
                        isActive && { borderColor: '#fff', borderWidth: 1 },
                    ]} 
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: isActive ? '#fff' : cat.color },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={styles.productsContainer}>
        {groupedProducts.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <View key={item.id} style={styles.productCardWrapper}>
                <CardModal
                  image={require('@/assets/TestImages/TestImage.png')}
                  name={item.name}
                  rating={item.rating.toString()}
                  price={item.price}
                  description={item.description}
                  maxLength={50}
                  farmName={item.farmName}
                  location={item.location}
                  showWishlist={true}
                  buttonText="Add"
                />
              </View>
            ))}
          </View>
        ))}
      </View>

        <BuyerButton
            height={40}
            width={330}
            backgroundColor= "transparent"
            borderColor='#1F1F1F52'
            borderRadius={3}
            text='View More'
            textStyle={{ color: "#1F1F1FA6", fontSize: 20, fontWeight: '500', fontFamily: 'Poppins-Medium' }}
            onPress={() => console.log('abc')}
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
    marginBottom: 10,
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  categoryImage: {
    width: 60,
    height: 45,
    resizeMode: 'cover',
    marginBottom: 4,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
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

export default CategoriesAllProducts
