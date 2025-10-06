// app/login/index.tsx
import ProfileButton from '@/components/profileButton'
import GoBackButton from '@/components/ProfileGoBack'
import ProfileInput from '@/components/profileInput'
import ProgressStepper from '@/components/ProfileProgressBar'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/buyer");
    }
  }, [isAuthenticated]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    clearError();
    
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    try {
      await login(email, password);
      // Navigation handled by useEffect
    } catch (err) {
      Alert.alert("Login Failed", error || "An error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="profile" />}

      <View style={styles.main}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Image
          source={require("../../assets/images/LoginImage.png")}
          style={styles.welcomeimage}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <ProfileInput
          placeholder="Enter your email"
          type="email"
          value={email}
          onChangeText={setEmail}
        />

        <ProfileInput
          placeholder="Enter your password"
          type="password"
          value={password}
          onChangeText={setPassword}
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#169E1C" />
        ) : (
          <ProfileButton text="Login" onPress={handleSubmit} />
        )}

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink} onPress={() => router.push('/login/createprofile')}>
            Sign up
          </Text>
        </Text>
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
    textAlign: 'center',
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1F1F1FA6',
  },
  signupLink: {
    color: '#169E1C',
    fontWeight: '500',
  },
});

export default LoginScreen