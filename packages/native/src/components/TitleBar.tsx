import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "./Colors";

const DEFAULT_BAR_WIDTH = 42;

type StyleProps = {
  width?: number;
};

const getStyles = (style: StyleProps) =>
  StyleSheet.create({
    titleBar: {
      backgroundColor: Colors.primary,
      width: style.width || DEFAULT_BAR_WIDTH,
      height: 6,
      marginTop: 12,
    },
  });

type TitleBarProps = StyleProps;

export const TitleBar: React.SFC<TitleBarProps> = props => {
  const styles = getStyles(props);

  return <View style={styles.titleBar} />;
};

export default TitleBar;
