// components/PrimaryButton.tsx
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ProfileButtonProps {
  text: string;
  onPress: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? "#169E1C" : "#169E1C8F" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: "500",
  },
});

export default ProfileButton;
