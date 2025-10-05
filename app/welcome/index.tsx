import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View>
        <Image
            source={require("../../assets/images/WelcomeScreenImage.jpg")}
            style={styles.welcomeimage}
        />
      </View>

      <View style={styles.title}>
        <Image
            source={require("../../assets/images/FarmeaseLogo.png")}
            style={styles.logoImage}
        />
        <Text style={styles.subtitle}>From Farm to You</Text>
      </View>

      <View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/termsAndConditionsPage")}
        >
            <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  welcomeimage: {
    marginTop:-50,
    width: 340,
    height: 580,
  },

  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: "#1F1F1FA8",
  },

  button: {
    backgroundColor: "#169E1C",
    width: 320,
    height: 60,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  logoImage: {
    width: 230,
    height: 40,
    objectFit: "contain"
  }
});
