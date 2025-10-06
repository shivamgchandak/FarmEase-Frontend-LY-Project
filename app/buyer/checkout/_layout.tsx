// app/buyer/checkout/_layout.tsx
import { Stack } from "expo-router";

export default function CheckoutLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: true,
          headerTitle: "Checkout",
          headerBackTitle: "Cart",
        }} 
      />
    </Stack>
  );
}