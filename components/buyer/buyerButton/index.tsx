import React from "react";
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";

interface BuyerButtonProps {
  text: string;
  onPress: () => void;
  height?: DimensionValue;
  width?: DimensionValue;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  textStyle?: TextStyle;
  // optional: disabled, loading, etc.
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
  // create typed style object and cast to ViewStyle to help TS
  const dynamicStyle: ViewStyle = {
    height: height as any,
    width: width as any,
    backgroundColor,
    borderColor,
    borderRadius,
  };

  return (
    <Pressable onPress={onPress} style={[styles.button, dynamicStyle]}>
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
    fontFamily: "Poppins-Medium",
  } as TextStyle,
});

export default BuyerButton;