import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "./Colors";
import { Fonts } from "./Fonts";

const styles = StyleSheet.create({
  titlePrimary: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontSize: 42,
    flexShrink: 1,
  },
});

type TitlePrimaryProps = TextProps & {
  text: string;
};

export const TitlePrimary: React.SFC<TitlePrimaryProps> = props => (
  <Text style={styles.titlePrimary} {...props}>
    {props.text}
  </Text>
);

export default TitlePrimary;
