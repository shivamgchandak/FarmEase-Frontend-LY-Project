import ProductFilterBar, {
    ProductStatus,
} from "@/components/farmer/products/filterbar";
import ProductCard, {
    FarmerProduct,
} from "@/components/farmer/products/orderCard";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

/* -------- Dummy data (replace with API later) -------- */
const DUMMY_PRODUCTS: FarmerProduct[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    price: 50,
    unit: "kg",
    description: "Plump, juicy, and bursting with flavour. The perfect base for any meal.",
    expiresInDays: 3,
    stockLeft: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    price: 50,
    unit: "kg",
    description: "Plump, juicy, and bursting with flavour. The perfect base for any meal.",
    expiresInDays: 3,
    stockLeft: 0,
    status: "outOfStock",
    outOfStockMode: "restock", // shows Restock / Remove Listing
  },
  {
    id: "3",
    name: "Fresh Tomatoes",
    price: 25,
    unit: "bunch",
    description: "Plump, juicy, and bursting with flavour. The perfect base for any meal.",
    expiresInDays: 3,
    stockLeft: 2,
    status: "outOfStock",
    outOfStockMode: "listAgain", // shows List Again / Remove Forever
  },
  {
    id: "4",
    name: "Fresh Tomatoes",
    price: 25,
    unit: "bunch",
    description: "Plump, juicy, and bursting with flavour. The perfect base for any meal.",
    expiresInDays: 3,
    stockLeft: 2,
    status: "expired",
  },
];

export default function MyProductsScreen() {
  const [tab, setTab] = useState<ProductStatus>("active");
  const [products] = useState<FarmerProduct[]>(DUMMY_PRODUCTS);

  const counts = useMemo(() => {
    const c: Record<ProductStatus, number> = {
      active: 0,
      outOfStock: 0,
      expired: 0,
    };
    products.forEach((p) => {
      c[p.status] = (c[p.status] || 0) + 1;
    });
    return c;
  }, [products]);

  const filtered = products.filter((p) => p.status === tab);

  const goToAddProduct = (productId: string) => {
    router.push(`/farmer/addProduct/${productId}`);
  };

  return (
    <View style={styles.screen}>

      {/* Filter bar */}
      <ProductFilterBar active={tab} counts={counts} onChange={setTab} />

      {/* List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={{ paddingTop: 40 }}>
            <Text style={{ textAlign: "center", color: "#999" }}>
              No products in this category
            </Text>
          </View>
        ) : (
          filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              tab={tab}
              onEdit={() => goToAddProduct(p.id)}
              onRestock={() => goToAddProduct(p.id)}
              onListAgain={() => goToAddProduct(p.id)}
              onRemoveListing={() => {}}
              onRemoveForever={() => {}}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EAEAEA",
  },
  backBtn: { width: 32, paddingVertical: 4 },
  backIcon: { fontSize: 20 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
});