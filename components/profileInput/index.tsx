import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface ProfileInputProps {
  placeholder?: string;
  type?: "text" | "number" | "password" | "email";
  value: string;
  onChangeText: (text: string) => void;
  height?: number;
  width?: number;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  placeholder = "Enter text",
  type = "text",
  value,
  onChangeText,
  height = 50,
  width = 300,
}) => {
  const getKeyboardType = () => {
    switch (type) {
      case "number":
        return "numeric";
      case "email":
        return "email-address";
      default:
        return "default";
    }
  };

  return (
    <TextInput
      style={[styles.input, { height, width }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={getKeyboardType()}
      multiline={height > 50}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#1F1F1F52",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    fontFamily: "Poppins-Light",
    fontWeight: "300",
    fontSize: 16,
    color: "#1F1F1F59",
  },
});

export default ProfileInput;
