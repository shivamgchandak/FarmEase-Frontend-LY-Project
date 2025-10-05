import TodayFreshDealsHeader from "@/components/header";
import { Stack } from "expo-router";

export default function RootLayout() {

  return <Stack>
    <Stack.Screen name="[id]" options={{headerShown: true, header: TodayFreshDealsHeader, title: "Farmers Near You"}} />
  </Stack>;
}
