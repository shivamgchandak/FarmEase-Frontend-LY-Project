import BuyerButton from "@/components/buyer/buyerButton";
import CardModal from "@/components/buyer/CardModal";
import dealsData from "@/TestData/CategoriesProducts/data.json";
import farmersData from "@/TestData/Farmers/data.json";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const FarmerDetails = () => {

    const [visibleCount, setVisibleCount] = useState(8);
    const dealsToShow = dealsData.slice(0, visibleCount);

    const loadMore = () => {
      setVisibleCount(prev => Math.min(prev + 4, dealsData.length));
    };

  const { id } = useLocalSearchParams();
  const farmer = farmersData.find((item) => item.id === Number(id));

  if (!farmer) {
    return (
      <View>
        <Text>No farmer found with ID{id}</Text>
      </View>
    );
  }

  return (

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>

        <View style={styles.container}>


            <Image source={require("@/assets/TestImages/TestImage.png")} style={styles.farmerImage}/>

            <View style={styles.textDetailsContainer}>

                <Text style={styles.farmerName}>{farmer.name}</Text>

                <View style={styles.farmerOtherDetailsContainer}>

                    <View style={styles.farmerOtherdetails}>

                        <Image source={require("@/assets/images/BuyerNavbarFarmer.png")} style={styles.otherDetailsImages}/>
                        <Text style={styles.otherDetailsText}>{farmer.farmName}</Text>

                    </View>

                    <View style={styles.farmerOtherdetails}>

                        <Image source={require("@/assets/images/RedLocationPin.png")} style={styles.otherDetailsImages}/>
                        <Text style={styles.otherDetailsText}>{farmer.location}</Text>

                    </View>

                    <View style={styles.farmerOtherdetails}>

                        <Image source={require("@/assets/images/RatingStar.png")} style={styles.otherDetailsImages}/>
                        <Text style={styles.otherDetailsText}>{farmer.rating}</Text>

                    </View>

                </View>

                <Text style={styles.farmerDescription}>{farmer.description}</Text>

            </View>

        </View>

        <View style={styles.bottomcontainer}>
          <Text style={styles.bottomContainerTitle}>Fresh from {farmer.farmName}</Text>

          <View style={styles.cards}>
            {dealsToShow.map((item, index) => (
              <View key={`${item.id}-${index}`} style={styles.cardWrapper}>
                <CardModal
                  image={require("@/assets/TestImages/TestImage.png")}
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
          </View>

          {visibleCount < dealsData.length && (
              <BuyerButton
                height={50}
                width={340}
                backgroundColor="#169E1C"
                borderColor="#169E1C"
                borderRadius={6}
                text="Load More"
                textStyle={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "600",
                  fontFamily: "Poppins-Medium",
                }}
                onPress={loadMore}
              />
          )}
        </View>

    </ScrollView>

  );
};

export default FarmerDetails;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        position: "relative"
    },
    container: {
        width: 330,
        backgroundColor: '#ffffff',
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 80,
        position: "relative",
    },
    textDetailsContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 10,
        marginTop: -50,
        marginBottom: 20,
    },
    farmerImage: {
        position: 'relative',
        top: '-30%', 
        height: 170,
        width: 170,
        borderRadius: 85,
        objectFit: "cover"
    },
    farmerName:{
        color: '#1F1F1F',
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 30.
    },
    farmerOtherDetailsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    farmerOtherdetails:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    otherDetailsImages:{
        height: 12,
        width: 12,
        objectFit: "cover"
    },
    otherDetailsText:{
        color: '#1F1F1FA6',
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 12.
    },
    farmerDescription:{
        color: '#1F1F1F63',
        fontFamily: 'Poppins-Light',
        fontWeight: '300',
        fontSize: 12,
        textAlign: 'center',
    },
    bottomcontainer:{
        width: 340, 
        marginBottom: 20,
        gap: 20,
    },
    bottomContainerTitle:{
        color: '#169E1C',
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 22,
        textAlign: 'center',
    },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 15,
  },
});
