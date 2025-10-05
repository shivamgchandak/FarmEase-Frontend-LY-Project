import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

interface BuyerButtonProps {
  text: string;            
  onPress: () => void;      
  height?: number;             
  width?: number;            
  backgroundColor?: string;    
  borderColor?: string;    
  borderRadius?: number;     
  textStyle?: TextStyle;
}

const BuyerButton: React.FC<BuyerButtonProps> = ({
  text,
  onPress,
  height,
  width,
  backgroundColor,
  borderColor,
  borderRadius,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          height,
          width,
          backgroundColor,
          borderColor,
          borderRadius,
        },
      ]}
    >
      <Text style={[styles.defaultText, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  } as ViewStyle,
  defaultText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Poppins-Medium"
  } as TextStyle,
});

export default BuyerButton;
