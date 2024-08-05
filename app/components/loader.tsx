import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";

const Loader: React.FC = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      })
    ).start();
  }, [opacity, rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={{ opacity, transform: [{ rotate }] }}>
        <Image
          source={require("../../assets/images/wallify-logo.png")}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
