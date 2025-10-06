// app/buyer/products/_layout.tsx
import { Stack } from "expo-router";

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[id]" 
        options={{
          headerShown: true,
          headerTitle: "Product Details",
          headerBackTitle: "Back",
        }} 
      />
    </Stack>
  );
}