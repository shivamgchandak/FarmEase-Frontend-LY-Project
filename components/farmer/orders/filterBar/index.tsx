// components/orders/FilterBar.tsx
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type OrderStatus = "new" | "confirmed" | "shipped" | "completed";

type Props = {
  active: OrderStatus;
  counts?: Partial<Record<OrderStatus, number>>;
  onChange: (s: OrderStatus) => void;
};

const LABELS: Record<OrderStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  shipped: "Shipped",
  completed: "Completed",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "#169E1C",        // green
  confirmed: "#1F1F1F",  // black
  shipped: "#C1694F",    // brown / orange-ish
  completed: "#3B88C3",  // blue
};

export default function FilterBar({ active, counts = {}, onChange }: Props) {
  const tabs: OrderStatus[] = ["new", "confirmed", "shipped", "completed"];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {tabs.map((t) => {
          const focused = t === active;
          const color = STATUS_COLORS[t];

          return (
            <TouchableOpacity
              key={t}
              style={[
                styles.tab,
                {
                  borderColor: color,
                  backgroundColor: focused ? color : "#FFFFFF",
                },
              ]}
              onPress={() => onChange(t)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#FFFFFF" : color },
                ]}
              >
                {LABELS[t]}
                {counts[t] ? ` (${counts[t]})` : ""}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: "400",
  },
});