
// app/buyer/cart/_layout.tsx
import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          headerShown: true,
          headerTitle: "My Cart",
          headerBackTitle: "Back",
        }} 
      />
    </Stack>
  );
}