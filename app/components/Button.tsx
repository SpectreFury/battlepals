import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";
import { useState } from "react";

type ButtonProps = {
  onPress: () => Promise<void>;
  variant?: "light" | "dark";
  label?: string;
};

const Button = ({ onPress, variant = "light", label }: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const backgroundColor = variant === "light" ? colors.light : colors.dark;

  const handlePress = async () => {
    setLoading(true);
    await onPress();
    setLoading(false);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: backgroundColor,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: variant === "light" ? colors.dark : colors.light,
          fontWeight: 600,
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "light" ? colors.dark : colors.light}
          />
        ) : (
          label
        )}
      </Text>
    </Pressable>
  );
};

export default Button;
