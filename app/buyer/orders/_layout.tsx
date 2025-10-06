// app/buyer/orders/_layout.tsx
import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: true,
          headerTitle: "My Orders",
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: true,
          headerTitle: "Order Details",
          headerBackTitle: "Orders",
        }} 
      />
    </Stack>
  );
}