// components/buyer/homePage/CategoriesAllProducts/index.tsx (continued)
import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import BuyerButton from '../../buyerButton'
import CardModal from '../../CardModal'
import { consumerApi } from '@/api/consumerApi'
import axios from 'axios'

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

const categoryConfig = [
  { slug: "vegetables", label: "Vegetable", icon: require('@/assets/images/CategoryVegetables.png'), color: "#169E1C" },
  { slug: "fruits", label: "Fruits", icon: require('@/assets/images/CategoryFruits.png'), color: "#EF8E00" },
  { slug: "dairy", label: "Dairy", icon: require('@/assets/images/CategoryDairy.png'), color: "#3B88C3" },
  { slug: "grains", label: "Grains", icon: require('@/assets/images/CategoryGrains.png'), color: "#C1694F" },
]

const CategoriesAllProducts = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId)
    }
  }, [selectedCategoryId])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://40a41a6097fc.ngrok-free.app/api/categories')
      const fetchedCategories = response.data
      
      setCategories(fetchedCategories)
      
      if (fetchedCategories.length > 0) {
        setSelectedCategoryId(fetchedCategories[0]._id)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      setProductsLoading(true)
      const response = await consumerApi.getProducts({
        category: categoryId,
        limit: 4,
        page: 1
      })
      console.log(response.data)
      setProducts(response.data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setProductsLoading(false)
    }
  }

  const getCategoryConfig = (categorySlug: string) => {
    return categoryConfig.find(c => c.slug.toLowerCase() === categorySlug.toLowerCase()) || categoryConfig[0]
  }

  const groupedProducts = []
  for (let i = 0; i < products.length; i += 2) {
    groupedProducts.push(products.slice(i, i + 2))
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#169E1C" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <View style={styles.categoryButtonContainer}>
        {categories.slice(0, 4).map(cat => {
          const config = getCategoryConfig(cat.slug)
          const isActive = selectedCategoryId === cat._id
          
          return (
            <TouchableOpacity
              key={cat._id}
              style={[
                styles.categoryButton,
                {
                  borderColor: config.color,
                  backgroundColor: isActive ? config.color : '#F9F9F9',
                },
              ]}
              onPress={() => setSelectedCategoryId(cat._id)}
            >
              <Image 
                source={config.icon} 
                style={[
                  styles.categoryImage,
                  isActive && { borderColor: '#fff', borderWidth: 1 },
                ]} 
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: isActive ? '#fff' : config.color },
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {productsLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#169E1C" />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products available in this category</Text>
        </View>
      ) : (
        <>
          <View style={styles.productsContainer}>
            {groupedProducts.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item) => (
                  <View key={item._id} style={styles.productCardWrapper}>
                    <CardModal
                      image={
                        item.images?.[0]?.url 
                          ? { uri: item.images[0].url } 
                          : require('@/assets/TestImages/TestImage.png')
                      }
                      name={item.name}
                      rating={item.rating?.average?.toString() || "0"}
                      price={`₹${item.price}`}
                      priceBefore={item.originalPrice && item.originalPrice !== item.price ? `₹${item.originalPrice}` : undefined}
                      discount={item.discountPercent ? `${item.discountPercent}%` : undefined}
                      description={item.description}
                      maxLength={50}
                      farmName={item.farmerName}
                      location={item.farmerLocation?.city || ""}
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
            backgroundColor="transparent"
            borderColor='#1F1F1F52'
            borderRadius={3}
            text='View More'
            textStyle={{ color: "#1F1F1FA6", fontSize: 20, fontWeight: '500', fontFamily: 'Poppins-Medium' }}
            onPress={() => console.log('View more products in category:', selectedCategoryId)}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#1F1F1FA6',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
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