import SplashScreen from "@/components/SplashScreen";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="buyer" options={{headerShown: false}} />
    <Stack.Screen name="language" options={{headerShown: false}} />
    <Stack.Screen name="role" options={{headerShown: false}} />
    <Stack.Screen name="login" options={{headerShown: false}} />
    <Stack.Screen name="terms-condition/index" options={{headerShown: false}} />
  </Stack>;
}
