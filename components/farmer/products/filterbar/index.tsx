import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ProductStatus = "active" | "outOfStock" | "expired";

type Props = {
  active: ProductStatus;
  counts?: Partial<Record<ProductStatus, number>>;
  onChange: (s: ProductStatus) => void;
};

const LABELS: Record<ProductStatus, string> = {
  active: "Active",
  outOfStock: "Out of Stock",
  expired: "Expired",
};

const ACTIVE_COLORS: Record<ProductStatus, string> = {
  active: "#169E1C",      // green
  outOfStock: "#C1694F",  // brownish
  expired: "#3B88C3",     // blue
};

export default function FilterBar({ active, counts = {}, onChange }: Props) {
  const tabs: ProductStatus[] = ["active", "outOfStock", "expired"];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {tabs.map((t) => {
          const focused = t === active;
          const color = ACTIVE_COLORS[t];

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