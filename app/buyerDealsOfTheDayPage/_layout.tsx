import TodayFreshDealsHeader from "@/components/header";
import { Stack } from "expo-router";

export default function RootLayout() {

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: true, header: TodayFreshDealsHeader, title: "Today's Fresh Deals"}} />
  </Stack>;
}
