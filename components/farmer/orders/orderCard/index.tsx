// components/orders/OrderCard.tsx
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ProductRow from "../productRow";

export type OrderProduct = {
  id: string;
  title: string;
  qty: string;
  price?: number;
  image?: string;
};

export type Order = {
  id: string;
  customer: string;
  location?: string;
  status: "new" | "confirmed" | "shipped" | "completed";
  products: OrderProduct[];
  total: number;
  time?: string;
};

type Props = {
  order: Order;
  onAction?: (order: Order) => void;
};

export default function OrderCard({ order, onAction }: Props) {
  const [open, setOpen] = useState(false);

  const actionLabel = (() => {
    switch (order.status) {
      case "new":
        return "Confirm Order";
      case "confirmed":
        return "Print Shipping Label";
      case "shipped":
        return "Track Delivery";
      case "completed":
        return "View Details";
      default:
        return "Action";
    }
  })();

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setOpen(true)}
        activeOpacity={0.9}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.orderId}>Order ID : #{order.id}</Text>

          <View style={styles.headerRow}>
            <View style={styles.nameRow}>
              <Image source={require("@/assets/images/FarmerOrderPerson.png")} style={styles.nameImage}/>
              <Text style={styles.customerName}>
                {order.customer}
              </Text>
            </View>

            <View style={styles.locationAndTime}>
              {order.location && (
                <View style={styles.locationRow}>
                  <Image source={require("@/assets/images/LocationPinRegular.png")} style={styles.nameImage}/>
                  <Text style={styles.locationText}>{order.location}</Text>
                </View>
              )}
              {order.time && (
                <View style={styles.locationRow}>
                  <Image source={require("@/assets/images/ClockRegular.png")} style={styles.nameImage}/>
                  <Text style={styles.locationText}>
                    {order.time}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Products */}
        {order.products.map((p, index) => (
          <View key={p.id}>
            <ProductRow
              title={p.title}
              qty={p.qty}
              price={p.price}
              image={p.image}
            />
            {/* Dashed separator between rows, except after last */}
            {index !== order.products.length - 1 && (
              <View style={styles.productDivider} />
            )}
          </View>
        ))}

        {/* Footer bar */}
        <View style={styles.footerBar}>
          <Text style={styles.totalLabel}>Order Total: ₹{order.total}</Text>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onAction?.(order)}
            activeOpacity={0.85}
          >
            <Text style={styles.actionLabel}>{actionLabel}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  // header
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 12,
    color: "#B3B3B3",
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  locationAndTime:{
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameImage: {
    height: 15,
    width: 15,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E8B32",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#777777",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },

  productDivider: {
    height: 1,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    borderStyle: "dashed",
    marginHorizontal: 16,
  },

  // footer bar (black area)
  footerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111111",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  totalLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  actionBtn: {
    backgroundColor: "#2E8B32",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  actionLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});