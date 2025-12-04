import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import eyeIcon from "../../../../assets/images/EyeFarmer.png";
import plusIcon from "../../../../assets/images/PlusFarmer.png";

const QuickActions = () => {
  const actions = [
    {
      label: "Add Product",
      color: "#3CA541",
      icon: plusIcon,
      onPress: () => router.push("/farmer/addProduct"),
    },
    {
      label: "View All Orders",
      color: "#3B88C3",
      icon: eyeIcon,
      onPress: () => router.push("/farmer/myOrders"),
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Quick Actions</Text>

      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { backgroundColor: action.color }]}
          onPress={action.onPress}
          activeOpacity={0.8}
        >
          <Image source={action.icon} style={styles.icon} />
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    color: "#000",
  },

  button: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  icon: {
    width: 16,
    height: 16,
  },

  label: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
});

export default QuickActions;