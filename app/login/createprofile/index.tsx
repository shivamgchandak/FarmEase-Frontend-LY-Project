// app/login/createprofile/index.tsx
import ProgressStepper from '@/components/ProfileProgressBar'
import ProfileButton from '@/components/profileButton'
import ProfileInput from '@/components/profileInput'
import { useAuthStore } from '@/store/authStore'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
    Alert,
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

const CreateProfileScreen: React.FC = () => {
  const router = useRouter()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/buyer");
    }
  }, [isAuthenticated]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(cleaned);
  };

  const handleRegister = async () => {
    clearError();

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all required fields")
      return
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address")
      return
    }

    if (phone.length !== 10) {
      Alert.alert("Error", "Phone number must be 10 digits")
      return
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    try {
      await register({
        name: fullName,
        email,
        phone,
        password,
        role: 'consumer'
      });
      // Navigation handled by useEffect
    } catch (err) {
      console.error(err)
      Alert.alert("Registration Failed", error || "An error occurred")
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="profile" />}

      <View style={styles.main}>
        <Text style={styles.title}>Create Account</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("@/assets/images/CreateProfileImage.png")
          }
          style={styles.welcomeimage}
        />

        <View style={styles.uploadContainer}>
          {selectedImage ? (
            <TouchableOpacity onPress={removeImage}>
              <Text style={styles.uploadText}>Remove Picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.uploadText}>Upload Picture</Text>
            </TouchableOpacity>
          )}
        </View>

        <ProfileInput
          placeholder="Enter full name"
          type="text"
          value={fullName}
          onChangeText={setFullName}
        />

        <ProfileInput
          placeholder="Enter email"
          type="email"
          value={email}
          onChangeText={setEmail}
        />

        <ProfileInput
          placeholder="Enter phone number"
          type="number"
          value={phone}
          onChangeText={handlePhoneChange}
        />

        <ProfileInput
          placeholder="Enter password"
          type="password"
          value={password}
          onChangeText={setPassword}
        />

        <ProfileInput
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {!isKeyboardVisible && (
          isLoading ? (
            <ActivityIndicator size="large" color="#169E1C" />
          ) : (
            <ProfileButton text="Register" onPress={handleRegister} />
          )
        )}

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => router.push('/login')}>
            Login
          </Text>
        </Text>
      </View>
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
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 24,
    color: "#000000",
  },
  welcomeimage: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: "#1F1F1F52",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadText: {
    color: "#1F1F1F59",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1F1F1FA6',
  },
  loginLink: {
    color: '#169E1C',
    fontWeight: '500',
  },
})

export default CreateProfileScreen