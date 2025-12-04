// components/buyer/bottomNavbar.tsx
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabKey = "Home" | "My Products" | "My Orders" | "Earnings";

const BottomNavbar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // NOTE: these route names MUST match your Tabs.Screen name values in app/buyer/_layout.tsx
  const tabs: { key: TabKey; route: string; icon: any; label: string }[] = [
    {
      key: "Home",
      route: "index",
      icon: require("../../../assets/images/farmerBottomNavbarHome.png"),
      label: "Home",
    },
    {
      key: "My Products",
      route: "myProducts",
      icon: require("../../../assets/images/farmerBottomNavbarProducts.png"),
      label: "My Products",
    },
    {
      key: "My Orders",
      route: "myOrders",
      icon: require("../../../assets/images/farmerBottomNavbarOrders.png"),
      label: "My Orders",
    },
    {
      key: "Earnings",
      route: "myEarnings",
      icon: require("../../../assets/images/farmerBottomNavbarEarnings.png"),
      label: "Earnings",
    },
  ];

  const focusedIndex = state.index ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.maintab}>
          {tabs.map((tab, index) => {
            const isFocused = focusedIndex === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: state.routes[index].key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // navigate by route name registered in your Tabs
                navigation.navigate(tab.route as never);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: state.routes[index].key,
              });
            };

            return (
              <TouchableOpacity
                key={tab.key + index}
                style={styles.tab}
                onPress={onPress}
                onLongPress={onLongPress}
                activeOpacity={0.8}
              >
                <View style={isFocused ? styles.activeIconWrapperMain : undefined}>
                  <View style={isFocused ? styles.activeIconWrapper : undefined}>
                    <View style={isFocused ? styles.activeIconWrapperSub : undefined}>
                      <Image source={tab.icon} style={styles.icon} />
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
    height: 80,
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
    marginTop: 4,
  },
});

export default BottomNavbar;