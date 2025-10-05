import ProgressStepper from '@/components/ProfileProgressBar'
import { useRouter } from "expo-router"
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RoleScreen = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = ["farmer", "buyer"];

  // Map roles to images
  const roleImages: Record<string, any> = {
    farmer: require("../../assets/images/RoleFarmer.png"),
    buyer: require("../../assets/images/RoleBuyer.png"),
  };

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    router.push("/FarmDetailProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressStepper currentStep="role" />

      <View style={styles.main}>
        <Text style={styles.text}>Choose Your Role</Text>

        <View style={styles.roleList}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleButton,
                selectedRole === role && styles.selectedRoleButton,
              ]}
              onPress={() => handleSelect(role)}
            >
              <Image 
                source={roleImages[role]} 
                style={[
                    styles.roleImage,
                    selectedRole === role && styles.selectedRoleImage
                ]}
              />
              <Text
                style={[
                  styles.roleText,
                  selectedRole === role && styles.selectedRoleText,
                ]}
              >
                I am a {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  main: {
    justifyContent: "center",
    height: "80%",
  },
  text: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
    color: "#000000",
  },
  roleList: {
    marginTop: 30,
    alignItems: "center",
  },
  roleImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 20,
  },
  selectedRoleImage: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  roleButton: {
    height: 60,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.28,
    borderColor: "#1F1F1FA6",
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    gap: 10,
  },
  selectedRoleButton: {
    backgroundColor: "#169E1C",
    borderColor: "#169E1C",
  },
  roleText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 20,
    color: "#1F1F1FA6",
  },
  selectedRoleText: {
    color: "#fff",
  },
});

export default RoleScreen;
