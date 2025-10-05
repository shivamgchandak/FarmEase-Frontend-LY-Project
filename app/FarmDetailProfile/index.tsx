import ProfileButton from '@/components/profileButton'
import GoBackButton from '@/components/ProfileGoBack'
import ProfileInput from '@/components/profileInput'
import ProgressStepper from '@/components/ProfileProgressBar'
import { useRouter } from "expo-router"
import React, { useEffect, useRef, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const produceOptions = [
  { key: "vegetables", label: "Vegetables", image: require("../../assets/images/CategoryVegetables.png") },
  { key: "fruits", label: "Fruits", image: require("../../assets/images/CategoryFruits.png") },
  { key: "dairy", label: "Dairy", image: require("../../assets/images/CategoryDairy.png") },
  { key: "grains", label: "Grains", image: require("../../assets/images/CategoryGrains.png") },
]

const FarmDetailScreen = () => {
  const router = useRouter()

  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const [farmName, setFarmName] = useState("")
  const [farmLocation, setFarmLocation] = useState("")
  const [selectedProduce, setSelectedProduce] = useState<string[]>([])

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

  const toggleSelection = (key: string) => {
    setSelectedProduce((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    )
  }

  const handleContinue = () => {
    if (!farmName || !farmLocation || selectedProduce.length === 0) {
      alert("Please fill farm name, farm location, and select at least one produce.")
      return
    }
    router.push("/buyerhomepage")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {!isKeyboardVisible && <ProgressStepper currentStep="role" />}

      <View style={styles.main}>
        <View>
          <Text style={styles.text}>Farm Details</Text>

          <ProfileInput
            placeholder="Enter your farm name"
            type="text"
            value={farmName}
            onChangeText={setFarmName}
          />

          <ProfileInput
            placeholder="Enter your farm location"
            type="text"
            value={farmLocation}
            onChangeText={setFarmLocation}
            height={100}
          />
        </View>

          <View>
            <Text style={styles.text}>Your farm Produce</Text>

            <View style={styles.produceContainer}>
              {produceOptions.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.produceItem,
                    selectedProduce.includes(item.key) && styles.produceItemSelected,
                  ]}
                  onPress={() => toggleSelection(item.key)}
                >
                  <Image
                    source={item.image}
                    style={[
                      styles.produceImage,
                      selectedProduce.includes(item.key) && styles.produceImageSelected,
                    ]}
                  />
                  <Text
                    style={[
                      styles.produceLabel,
                      selectedProduce.includes(item.key) && styles.produceLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {!isKeyboardVisible && <ProfileButton text="Continue" onPress={handleContinue} />}
      </View>

      
      {!isKeyboardVisible && <GoBackButton path="role" />}
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
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
  text: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
    color: "#000000",
    marginBottom: 10,
  },
  produceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  produceItem: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F1F1F52",
    borderRadius: 12,
    padding: 10,
    width: 100,
  },
  produceItemSelected: {
    borderColor: "#169E1C",
    backgroundColor: "#169E1C",
  },
  produceImage: {
    width: 70,
    height: 50,
    marginBottom: 8,
    borderRadius: 8,
  },
  produceImageSelected: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  produceLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#1F1F1FA6",
  },
  produceLabelSelected: {
    color: "#FFFFFF",
  },
})

export default FarmDetailScreen
