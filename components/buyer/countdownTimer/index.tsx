import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CountdownTimerProps {
  targetTime: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const diff = targetTime.getTime() - now;

    if (diff <= 0) {
      return "0h 0m 0s";
    } else {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  useEffect(() => {
    // Set immediately on mount
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>⏳ Ends in: {timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  timerText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#169E1C",
  },
});

export default CountdownTimer;
