import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

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

  const { width } = Dimensions.get("window");
  const itemWidth = (width - 40) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Animated.View
          style={[styles.skeleton, { width: itemWidth, opacity }]}
        />
        <Animated.View
          style={[styles.skeleton, { width: itemWidth, opacity }]}
        />
      </View>
      <View style={styles.row}>
        <Animated.View
          style={[styles.skeleton, { width: itemWidth, opacity }]}
        />
        <Animated.View
          style={[styles.skeleton, { width: itemWidth, opacity }]}
        />
      </View>
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  skeleton: {
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
});
