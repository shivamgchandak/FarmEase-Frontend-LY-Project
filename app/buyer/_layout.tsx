// app/buyer/_layout.tsx
import BottomNavbar from "@/components/buyer/bottomNavbar";
import AddressBar from "@/components/buyer/homePage/topAddressBar";
import { Tabs } from "expo-router";

export default function BuyerLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AddressBar />,
      }}
      tabBar={(props) => <BottomNavbar {...props} />}
    >
      {/* Main Tab Screens */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="deals-of-day"
        options={{ title: "Deals", headerShown: true }}
      />
      
      <Tabs.Screen
        name="farmer-near-me"
        options={{ title: "Farmers Near Me", headerShown: true }}
      />
      
      <Tabs.Screen
        name="my-account"
        options={{ title: "My Account", headerShown: true }}
      />
      
      <Tabs.Screen
        name="wishlist"
        options={{ title: "Wishlist", headerShown: true }}
      />

      {/* Hidden from tab bar - Stack navigation */}
      <Tabs.Screen
        name="product"
        options={{ 
          title: "Products",
          href: null, // Hide from tab bar
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{ 
          title: "Cart",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="checkout"
        options={{ 
          title: "Checkout",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{ 
          title: "Orders",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="specific-farmer"
        options={{ 
          title: "Farmer Details",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="farm-detail"
        options={{ 
          title: "Farm Detail",
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}