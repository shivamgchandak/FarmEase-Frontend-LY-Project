import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const WishlistButton = () => {

  const [isWishListClicked, setIsWishlistClicked] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlistClicked(!isWishListClicked);
    console.log("wishlist");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleWishlistClick}>
        <Image
          source={
            isWishListClicked
              ? require("@/assets/images/FilledHeart.png")
              : require("@/assets/images/EmptyHeart.png")
          }
          style={styles.wishlistImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 28,
    width: 28,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  wishlistImage: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});

export default WishlistButton;
