import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
  },
});

type LinkProps = TextProps & {
  text: string;
};

export const Link: React.SFC<LinkProps> = ({ text }) => (
  <Text style={styles.link}>{text}</Text>
);

export default Link;
