import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatItem = {
  label: string;
  value: string | number;
  color: string;
};

const QuickStats = () => {
  // ------- Dummy Data (Replace later with API) -------
  const stats: StatItem[] = [
    {
      label: "Today's Orders",
      value: 12,
      color: "#3B88C3", // green
    },
    {
      label: "Today's Sales",
      value: "₹1,250",
      color: "#2E8B32", // green
    },
    {
      label: "Orders Pending",
      value: 3,
      color: "#B56A4B", // brownish-orange
    },
    {
      label: "Urgent Products",
      value: "1",
      color: "#D8634E", // red-orange
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Quick Stats</Text>

      <View style={styles.grid}>
        {stats.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 16,
    color: "#000",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 16,

    // soft shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  label: {
    fontSize: 12,
    color: "#0000004D",
    marginBottom: 6,
    fontWeight: "400",
  },

  value: {
    fontSize: 25,
    fontWeight: "500",
  },
});

export default QuickStats;