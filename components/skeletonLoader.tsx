import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoader: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  skeleton: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
    borderRadius: 10,
  },
});
