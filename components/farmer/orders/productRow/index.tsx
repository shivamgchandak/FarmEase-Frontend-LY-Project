// components/orders/ProductRow.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// correct static require (works on Android + iOS)
const placeholder = require("../../../../assets/images/Placeholder.png");

type Props = {
  image?: string | null;
  title: string;
  qty: string;
  price?: string | number;
};

export default function ProductRow({ image, title, qty, price }: Props) {
  return (
    <View style={styles.row}>
      <Image
        source={image ? { uri: image } : placeholder}
        style={styles.img}
      />

      <View style={styles.mid}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.qty}>{qty}</Text>
      </View>

      <Text style={styles.price}>₹{price ?? "—"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", padding: 8 },
  img: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  mid: { flex: 1 },
  title: { fontSize: 14, fontWeight: "600", color: "#111" },
  qty: { color: "#888", marginTop: 4, fontSize: 13 },
  price: { color: "#D8634E", fontWeight: "700" },
});