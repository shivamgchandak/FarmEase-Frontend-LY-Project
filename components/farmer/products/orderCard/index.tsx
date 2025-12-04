import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ProductStatus } from "../filterbar";

export type FarmerProduct = {
  id: string;
  name: string;
  price: number;
  unit: string; // kg, bunch, etc.
  description: string;
  expiresInDays: number;
  stockLeft: number;
  status: ProductStatus;
  // for out-of-stock cards: which green CTA to show
  outOfStockMode?: "restock" | "listAgain";
};

type Props = {
  product: FarmerProduct;
  tab: ProductStatus;

  onEdit: () => void;
  onRestock: () => void;
  onListAgain: () => void;
  onRemoveListing: () => void;
  onRemoveForever: () => void;
};

export default function ProductCard({
  product,
  tab,
  onEdit,
  onRestock,
  onListAgain,
  onRemoveListing,
  onRemoveForever,
}: Props) {
  const priceText = `₹${product.price}/${product.unit}`;

  return (
    <View style={styles.card}>
      {/* Top content */}
      <View style={styles.mainRow}>
        <View style={styles.left}>
          <Text style={styles.title}>
            {product.name} <Text style={styles.price}>{priceText}</Text>
          </Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>
              • <Text style={styles.metaLink}>Expires in {product.expiresInDays} days</Text>
            </Text>
            <Text style={styles.metaItem}>
              • <Text style={styles.metaText}>Stock Left: {product.stockLeft}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.imagePlaceholder} />
      </View>

      {/* Bottom actions (different per tab) */}
      {tab === "active" && (
        <View style={styles.activeFooter}>
          <TouchableOpacity
            style={[styles.smallBtn, styles.smallBtnOutline]}
            onPress={onEdit}
          >
            <Text style={styles.smallBtnOutlineText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallBtn, styles.smallBtnOutline]}
            onPress={onRemoveListing}
          >
            <Text style={styles.smallBtnOutlineText}>Mark as Out of Stock ▾</Text>
          </TouchableOpacity>
        </View>
      )}

      {tab === "outOfStock" && (
        <View style={styles.blackFooter}>
          <TouchableOpacity
            style={[styles.footerBtn, { backgroundColor: "#169E1C" }]}
            onPress={
              product.outOfStockMode === "listAgain" ? onListAgain : onRestock
            }
          >
            <Text style={styles.footerBtnText}>
              {product.outOfStockMode === "listAgain" ? "List Again" : "Restock"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerBtn, { backgroundColor: "#C64532" }]}
            onPress={
              product.outOfStockMode === "listAgain"
                ? onRemoveForever
                : onRemoveListing
            }
          >
            <Text style={styles.footerBtnText}>
              {product.outOfStockMode === "listAgain"
                ? "Remove Forever ✕"
                : "Remove Listing ✕"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {tab === "expired" && (
        <View style={styles.blackFooter}>
          <TouchableOpacity
            style={[styles.footerBtn, { backgroundColor: "#169E1C" }]}
            onPress={onListAgain}
          >
            <Text style={styles.footerBtnText}>List Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerBtn, { backgroundColor: "#C64532" }]}
            onPress={onRemoveForever}
          >
            <Text style={styles.footerBtnText}>Remove Forever ✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  mainRow: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202020",
    marginBottom: 4,
  },
  price: {
    color: "#E26A3F",
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metaItem: {
    fontSize: 11,
    color: "#555555",
  },
  metaLink: {
    color: "#2E6EEB",
  },
  metaText: {
    color: "#555555",
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
  },

  /* Active tab footer */
  activeFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    marginTop: 8,
  },
  smallBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 8,
  },
  smallBtnOutline: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  smallBtnOutlineText: {
    fontSize: 12,
    color: "#555555",
  },

  /* Black bottom bar */
  blackFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#111111",
    marginHorizontal: -16,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  footerBtn: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});