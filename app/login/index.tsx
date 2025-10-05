import ProfileButton from '@/components/profileButton'
import GoBackButton from '@/components/ProfileGoBack'
import ProfileInput from '@/components/profileInput'
import ProgressStepper from '@/components/ProfileProgressBar'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

const LoginScreen = () => {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
    setNumber(cleaned);
  };

  const handleSubmit = () => {
    if (number.length !== 10) {
      setError("Number must be exactly 10 digits");
    } else {
      setError("");
      router.push("/login/otp")
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="profile" />}

      <View style={styles.main}>
        <Text style={styles.title}>Welcome!</Text>
        <Image
          source={require("../../assets/images/LoginImage.png")}
          style={styles.welcomeimage}
        />

        <ProfileInput
          placeholder="Enter your number"
          type="number"
          value={number}
          onChangeText={handleNumberChange}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <ProfileButton text="Continue" onPress={handleSubmit} />

      </View>

      {!isKeyboardVisible && <GoBackButton path="language" />}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 24,
    color: "#000000",
  },
  welcomeimage: {
    width: 315,
    height: 200,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#169E1C",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen
