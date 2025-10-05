import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

const WORD = "Farmease";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [showLeaf, setShowLeaf] = useState(false);

  const letters = WORD.split("").map(() => useRef(new Animated.Value(0)).current);

  const leafScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    letters.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 250,      
        delay: i * 150,    
        useNativeDriver: true,
      }).start(() => {
        if (i === WORD.length - 1) {
          setShowLeaf(true);
          Animated.spring(leafScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            onFinish();
          }, 1200);
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {showLeaf && (
          <Animated.Image
            source={require("../../assets/images/SplashScreenLeaf.png")} 
            style={[
              styles.leaf,
              { transform: [{ scale: leafScale }] },
            ]}
            resizeMode="contain"
          />
        )}
        {WORD.split("").map((char, i) => (
          <Animated.Text
            key={i}
            style={[styles.letter, { opacity: letters[i] }]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  letter: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 2,
  },
  leaf: {
    height: 14,
    width:20,
    position: "absolute",
    right: "24%",  
    top: 4,
  },
});
