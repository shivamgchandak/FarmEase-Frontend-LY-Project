import GoBackButton from '@/components/ProfileGoBack'
import ProgressStepper from '@/components/ProfileProgressBar'
import { useRouter } from "expo-router"
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LanguageScreen = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    "English",
    "Hindi",
    "Marathi",
  ]

  const handleSelect = (language: string) => {
    setSelectedLanguage(language);
    router.push("/login");
  }

  return (
    <SafeAreaView style={styles.container}>

      <ProgressStepper currentStep="language" />

      <View style={styles.main}>

        <Text style={styles.text}>Select Language</Text>

        <View style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity 
              key={language} 
              style={[
                styles.languageButton,
                selectedLanguage === language && styles.selectedLanguageButton
              ]}
              onPress={() => handleSelect(language)}
            >
              <Text 
                style={[
                  styles.languageText,
                  selectedLanguage === language && styles.selectedLanguageText
                ]}
              >
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      <GoBackButton path="welcome" />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  main:{
    justifyContent: "center",
    height: "80%"
  },
  text:{
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 24,
    color: "#000000",
  },
  languageList: {
    marginTop: 30,
    alignItems: "center",
  },
  languageButton: {
    height: 60,
    width: 230,
    justifyContent: "center",
    borderWidth: 1.28,
    borderColor: "#1F1F1FA6",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedLanguageButton: {
    backgroundColor: "#169E1C",
    borderColor: "#169E1C",
  },
  languageText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 20,
    color: '#1F1F1FA6',
  },
  selectedLanguageText: {
    color: "#fff",
  },
})

export default LanguageScreen
