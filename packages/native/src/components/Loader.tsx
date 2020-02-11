import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Animated } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  group: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  circle: {
    height: 5,
    width: 5,
    margin: 5,
    backgroundColor: "#181818",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#181818",
  },
});

type PropsObjectAnimated = {
  value: Animated.Value;
  sizes: number[];
};

const ObjectAnimated = ({ value, sizes }: PropsObjectAnimated) => (
  <Animated.View
    style={[
      styles.circle,
      {
        transform: [
          {
            scale: value.interpolate({
              inputRange: [0, 1, 2],
              outputRange: sizes,
            }),
          },
        ],
      },
    ]}
  />
);

export const Loader: React.SFC = () => {
  const animatedValue = new Animated.Value(0);

  const setTimingAnimated = (
    originalValue: Animated.Value,
    newValue: number,
    duration: number
  ) =>
    Animated.timing(originalValue, {
      toValue: newValue,
      duration,
      useNativeDriver: true,
    });

  const animate = useCallback(() => {
    Animated.sequence([
      setTimingAnimated(animatedValue, 0, 350),
      setTimingAnimated(animatedValue, 1, 350),
      setTimingAnimated(animatedValue, 2, 350),
    ]).start(() => animate());
  }, [animatedValue]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <ObjectAnimated value={animatedValue} sizes={[1.5, 1, 1]} />
        <ObjectAnimated value={animatedValue} sizes={[1, 1.5, 1]} />
        <ObjectAnimated value={animatedValue} sizes={[1, 1, 1.5]} />
      </View>
    </View>
  );
};

export default Loader;
