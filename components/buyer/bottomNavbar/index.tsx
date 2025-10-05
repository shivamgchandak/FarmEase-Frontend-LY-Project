import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabKey = "Home" | "Farmers" | "Cart" | "Favourites";

const BottomNavbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const tabs: { key: TabKey; route: string; icon: any; label: string }[] = [
    {
      key: "Home",
      route: "index",
      icon: require("../../../assets/images/BuyerNavbarHome.png"),
      label: "Home",
    },
    {
      key: "Farmers",
      route: "farmer-near-me",
      icon: require("../../../assets/images/BuyerNavbarFarmer.png"),
      label: "Farmers",
    },
    {
      key: "Cart",
      route: "cart",
      icon: require("../../../assets/images/BuyerNavbarCart.png"),
      label: "Cart",
    },
    {
      key: "Favourites",
      route: "wishlist",
      icon: require("../../../assets/images/BuyerNavbarWishlist.png"),
      label: "Favourites",
    },
  ];

  const currentRoute = state.routes[state.index].name; // ✅ get active route name

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.maintab}>
          {tabs.map((tab) => {
            const isFocused = currentRoute === tab.route; // ✅ match by route name

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: tab.route,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(tab.route as never);
              }
            };

            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tab}
                onPress={onPress}
                activeOpacity={0.8}
              >
                <View style={isFocused ? styles.activeIconWrapperMain : undefined}>
                  <View style={isFocused ? styles.activeIconWrapper : undefined}>
                    <View style={isFocused ? styles.activeIconWrapperSub : undefined}>
                      <Image
                        source={tab.icon}
                        style={[
                          styles.icon,
                          // { tintColor: isFocused ? "#3B88C3" : "#999" },
                        ]}
                      />
                    </View>
                  </View>
                  {isFocused && <Text style={styles.label}>{tab.label}</Text>}
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
  container: {},
  navbar: {
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  maintab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  activeIconWrapperMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: "15%",
  },
  activeIconWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 40,
  },
  activeIconWrapperSub: {
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
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#1F1F1FA6",
    fontWeight: "400",
  },
});

export default BottomNavbar;
