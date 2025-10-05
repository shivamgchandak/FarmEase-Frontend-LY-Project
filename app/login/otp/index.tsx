import ProfileButton from '@/components/profileButton'
import GoBackButton from '@/components/ProfileGoBack'
import ProfileInput from '@/components/profileInput'
import ProgressStepper from '@/components/ProfileProgressBar'
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
    View
} from 'react-native'

const OTPScreen: React.FC = () => {
  const router = useRouter()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [otp, setOtp] = useState("")
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

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6)
    setOtp(cleaned)
  }

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }
    router.push("/login/createprofile")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="profile" />}

      <View style={styles.main}>
        <Text style={styles.title}>Verify Your Number</Text>
        <Image
          source={require("@/assets/images/OTPImage.png")}
          style={styles.welcomeimage}
        />
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to +91 XXXXX-XXXXX. Please enter it below.
        </Text>

        <ProfileInput
          placeholder="Enter 6-digit OTP"
          type="number"
          value={otp}
          onChangeText={handleOtpChange}
        />

        <ProfileButton text="Verify" onPress={handleVerify} />

        <Text style={styles.resend}>
          Didn't receive the code? <Text style={styles.resendLink}>Resend OTP</Text>
        </Text>
      </View>

      {!isKeyboardVisible && <GoBackButton path="login" />}
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
    width: 130,
    height: 117,
  },
  subtitle: {
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 15,
    color: "#1F1F1FE5",
    paddingHorizontal: 10,
  },
  resend: {
    textAlign: "center",
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    fontSize: 15,
    color: "#1F1F1FE5",
  },
  resendLink: {
    color: "#169E1C",
  },
})

export default OTPScreen
