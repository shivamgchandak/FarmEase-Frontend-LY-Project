import BottomNavbar from "@/components/farmer/bottomNavbar";
import AddressBar from "@/components/farmer/homePage/topAddressBar";
import { Tabs, usePathname } from "expo-router";

export default function FarmerLayout() {
  const pathname = usePathname();

  // Hide header + bottom tab bar on addProduct screens
  // works for /buyer/farmer/addProduct and /buyer/farmer/addProduct/[productId]
  const hideChrome = pathname.startsWith("/farmer/addProduct");

  return (
    <Tabs
      screenOptions={{
        // if hideChrome is true → no header, else show AddressBar
        header: hideChrome ? () => null : () => <AddressBar />,
      }}
      // if hideChrome is true → no tab bar at all
      tabBar={(props) => (hideChrome ? null : <BottomNavbar {...props} />)}
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
        name="myProducts"
        options={{
          title: "My Products",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="myOrders"
        options={{
          title: "My Orders",
          href: null,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="myEarnings"
        options={{
          title: "My Earnings",
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}