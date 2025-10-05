import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Tab = "Home" | "Farmers" | "Cart" | "Favourites";

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key: "Home", icon: require("../../../assets/images/BuyerNavbarHome.png"), label: "Home" },
    { key: "Farmers", icon: require("../../../assets/images/BuyerNavbarFarmer.png"), label: "Farmers" },
    { key: "Cart", icon: require("../../../assets/images/BuyerNavbarCart.png"), label: "Cart" },
    { key: "Favourites", icon: require("../../../assets/images/BuyerNavbarWishlist.png"), label: "Favourites" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.maintab}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tab}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.8}
              >
                <View style={isActive ? styles.activeIconWrapperMain : undefined}>
                    <View style={isActive ? styles.activeIconWrapper : undefined}>
                        <View style={isActive ? styles.activeIconWrapperSub : undefined}>
                            <Image
                                source={tab.icon}
                                style={[
                                styles.icon,
                                ]}
                            />
                        </View>
                    </View>
                    {isActive && <Text style={styles.label}>{tab.label}</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  navbar: {
    height: 70,
    position: "relative",
    backgroundColor: "#fff",
  },
  maintab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: "0%",
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  activeIconWrapperMain:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '15%',
  },
  activeIconWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 40,
  },
  activeIconWrapperSub:{
    backgroundColor: "#3B88C31C",
    padding: 12,
    borderRadius: 40,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: "#1F1F1FA6",
    fontWeight: "400",
  },
});

export default BottomNavbar;
