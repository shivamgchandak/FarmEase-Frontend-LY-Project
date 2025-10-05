// import SplashScreen from "@/components/SplashScreen";
import { Stack } from "expo-router";
// import { useState } from "react";

export default function RootLayout() {
  // const [showSplash, setShowSplash] = useState(true);

  // if (showSplash) {
  //   return <SplashScreen onFinish={() => setShowSplash(false)} />;
  // }

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="welcome" options={{headerShown: false}} />
    <Stack.Screen name="language" options={{headerShown: false}} />
    <Stack.Screen name="role" options={{headerShown: false}} />
    <Stack.Screen name="login" options={{headerShown: false}} />
    <Stack.Screen name="OTP" options={{headerShown: false}} />
    <Stack.Screen name="createprofile" options={{headerShown: false}} />
    <Stack.Screen name="FarmDetailProfile" options={{headerShown: false}} />
    <Stack.Screen name="buyerhomepage" options={{headerShown: false}} />
    <Stack.Screen name="buyerDealsOfTheDayPage" options={{headerShown: false}} />
    <Stack.Screen name="buyerWishlistPage" options={{headerShown: false}} />
    <Stack.Screen name="farmerNearMePage" options={{headerShown: false}} />
    <Stack.Screen name="specificFarmer" options={{headerShown: false}} />
    <Stack.Screen name="myAccountPage" options={{headerShown: false}} />
    <Stack.Screen name="termsAndConditionsPage" options={{headerShown: false}} />
  </Stack>;
}
