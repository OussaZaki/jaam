import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";

type ListItemProps = {
  label: string;
  id: string;
  onPress: (id: string, clickArea: number) => void;
};

export const ListItem: React.SFC<ListItemProps> = ({ label, id, onPress }) => {
  const _onPress = (event: GestureResponderEvent) => {
    const { nativeEvent } = event;

    // TODO: move to configuration page
    const clickArea =
      nativeEvent.locationX > 160 ? 1 : nativeEvent.locationX < 60 ? 0 : 0.5;
    onPress(id, clickArea);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.95}
        onPress={_onPress}
      >
        <Text style={styles.playlist}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    justifyContent: "center",
    height: 60,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
  },
  playlist: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
