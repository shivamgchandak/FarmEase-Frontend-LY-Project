import ProgressStepper from '@/components/ProfileProgressBar'
import ProfileButton from '@/components/profileButton'
import ProfileInput from '@/components/profileInput'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
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
  const [city, setCity] = useState("")

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

  // Pick Image
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

  // Remove Image
  const removeImage = () => {
    setSelectedImage(null)
  }

  // Email validation regex
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleNext = () => {
    if (!fullName || !email || !city) {
      alert("Please fill all required fields (Full Name, Email, City)")
      return
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    router.push("/role")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="profile" />}

      <View style={styles.main}>
        <Text style={styles.title}>Create Profile</Text>

        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../../assets/images/CreateProfileImage.png")
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
          type="text"
          value={email}
          onChangeText={setEmail}
        />

        <ProfileInput
          placeholder="Enter city name"
          type="text"
          value={city}
          onChangeText={setCity}
        />

        {!isKeyboardVisible && <ProfileButton text="Next" onPress={handleNext} />}
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
    fontWeight: 400,
  },

})

export default CreateProfileScreen
