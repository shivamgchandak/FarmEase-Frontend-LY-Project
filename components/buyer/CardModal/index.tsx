import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BuyerButton from '../buyerButton';
import DiscountTab from '../CardModalDiscountTab';
import FarmLocation from '../FarmLocation';
import ProductDescription from '../ProductDescription';
import ProductNameAndRating from '../ProductNameAndRating';
import ProductPrice from '../ProductPrice';
import WishlistButton from '../wishlistButton';

interface CardModalProps {
  image: any;
  name: string;
  rating: string; 
  category?: string;
  price?: string;
  priceBefore?: string;
  discount?: string;
  showWishlist: boolean;
  description?: string;
  maxLength?: number;
  buttonText: string;
  location: string;
  farmName: string;
}

const CardModal: React.FC<CardModalProps> = ({
  image,
  name,
  rating,
  category,
  price, 
  priceBefore,
  discount,
  showWishlist,
  description,
  maxLength,
  buttonText,
  location,
  farmName,
}) => {

    return (
        <View style={styles.container}>

            <View style={styles.containerTop}>

                <View>
                    <Image source={require('@/assets/TestImages/TestImage.png')} style={styles.containerTopImage}/>
                </View>

                {showWishlist && (
                    <View style={styles.containerTopWishlist}>
                        <WishlistButton/>
                    </View>
                )}

                <View style={styles.containerTopDiscount}>
                    <DiscountTab discount={discount}/>
                </View>

                <View style={styles.containerTopButton}>
                    <BuyerButton
                        height={30}
                        width={80}
                        backgroundColor='#FFFFFF'
                        borderColor='#169E1C'
                        borderRadius={7}
                        text={buttonText}
                        textStyle={{ color: "#169E1C", fontSize: 14, fontWeight: '400', fontFamily: 'Poppins-Regular' }}
                        onPress={() => console.log('abc')}
                    />
                </View>
            
            </View>

            <View style={styles.containerBottom}>

                <View style={styles.containerBottomPriceTab}>
                    <ProductPrice price={price} priceBefore={priceBefore} />
                </View>

                <View style={styles.containerBottomNameAndRating}>
                    <ProductNameAndRating name={name} rating={rating} />
                </View>

                <View style={styles.containerBottomDescription}>
                    <ProductDescription description={description} maxLength={maxLength} />
                </View>

                <View style={styles.containerBottomLocationTab}>
                    <FarmLocation location={location} farmName={farmName}/>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderColor: "#9292921A",
        borderTopWidth: 1,
        height: 'auto',
        width: "100%",
        maxWidth: 160,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1.13 },
        shadowOpacity: 0.08,    
        shadowRadius: 7.12,       
        elevation: 2,  
        flex:1,
        alignItems:'flex-start',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 4,
        gap:10,
    },
    containerTop:{},
    containerTopWishlist:{
        position: 'absolute',
        top: 5,
        right: 5,
    },
    containerTopDiscount:{
        position: 'absolute',
        top: -15,
        right:-15,
    },
    containerTopImage:{
        height: 100,
        width: 140,
        borderRadius:4,
    },
    containerTopButton:{
        position: 'absolute',
        bottom: -10,
        right:0,
    },
    containerBottom:{
        gap:3,
    },
    containerBottomPriceTab:{},
    containerBottomNameAndRating:{},
    containerBottomDescription:{},
    containerBottomLocationTab:{},
})

export default CardModal