// app/buyer/orders.tsx
import FilterBar, { OrderStatus } from "@/components/farmer/orders/filterBar";
import OrderCard, { Order } from "@/components/farmer/orders/orderCard";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

/* ---------- Dummy Orders ---------- */
const DUMMY_ORDERS: Order[] = [
  {
    id: "FME10925003",
    customer: "Priya S.",
    location: "Mumbai",
    status: "new",
    products: [
      { id: "p1", title: "Cauliflower", qty: "1 piece", price: 45 },
      { id: "p2", title: "Okra", qty: "500g x 1", price: 45 },
    ],
    total: 115,
    time: "Yesterday, 6:15 PM",
  },
  {
    id: "FME10925004",
    customer: "Sameer V",
    location: "Mumbai",
    status: "confirmed",
    products: [
      { id: "p3", title: "Cauliflower", qty: "1 piece", price: 45 },
      { id: "p4", title: "Okra", qty: "500g x 1", price: 45 },
    ],
    total: 90,
    time: "Sept 23, 2025",
  },
  {
    id: "FME10925005",
    customer: "Priya S.",
    location: "Mumbai",
    status: "shipped",
    products: [
      { id: "p5", title: "Tomatoes", qty: "1kg", price: 60 },
    ],
    total: 60,
    time: "Today, 9:00 AM",
  },
  {
    id: "FME10925006",
    customer: "Ravi K",
    location: "Pune",
    status: "completed",
    products: [
      { id: "p6", title: "Potato", qty: "2kg", price: 80 },
    ],
    total: 80,
    time: "Sept 10, 2025",
  },
];

export default function OrdersScreen() {
  const [active, setActive] = useState<OrderStatus>("new");
  const [orders, setOrders] = useState<Order[]>(DUMMY_ORDERS);

  const counts = useMemo(() => {
    const c: Record<OrderStatus, number> = { new: 0, confirmed: 0, shipped: 0, completed: 0 };
    orders.forEach((o) => (c[o.status] = (c[o.status] || 0) + 1));
    return c;
  }, [orders]);

  const filtered = orders.filter((o) => o.status === active);

  const handleAction = (order: Order) => {
    // Example action behavior: change status on action
    if (order.status === "new") {
      setOrders((prev) => prev.map((p) => (p.id === order.id ? { ...p, status: "confirmed" } : p)));
      setActive("confirmed");
    } else if (order.status === "confirmed") {
      setOrders((prev) => prev.map((p) => (p.id === order.id ? { ...p, status: "shipped" } : p)));
      setActive("shipped");
    } else if (order.status === "shipped") {
      setOrders((prev) => prev.map((p) => (p.id === order.id ? { ...p, status: "completed" } : p)));
      setActive("completed");
    } else {
      // completed: maybe open details
      console.log("completed", order.id);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterBar active={active} counts={counts} onChange={setActive} />

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ height: 8 }} />
        {filtered.length === 0 ? (
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#9B9B9B" }}>No orders in this category</Text>
          </View>
        ) : (
          filtered.map((o) => <OrderCard key={o.id} order={o} onAction={handleAction} />)
        )}
      </ScrollView>
    </View>
  );
}