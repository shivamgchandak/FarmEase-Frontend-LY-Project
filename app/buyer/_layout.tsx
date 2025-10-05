import BottomNavbar from "@/components/buyer/bottomNavbar";
import AddressBar from "@/components/buyer/homePage/topAddressBar";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AddressBar />, // ✅ correct
      }}
      tabBar={(props) => <BottomNavbar {...props} />} // ✅ correct
    >
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
        name="farm-detail"
        options={{ title: "Farm Details", headerShown: true }}
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

      {/* ⚠️ Dynamic routes (like [id]) should not be in Tabs */}
      {/* These belong in a Stack, not Tabs — see below */}
    </Tabs>
  );
}
