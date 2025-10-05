import { Stack } from "expo-router";

export default function RootLayout() {

  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="otp/index" options={{headerShown: false}} />
    <Stack.Screen name="createprofile/index" options={{headerShown: false}} />

  </Stack>;
}
