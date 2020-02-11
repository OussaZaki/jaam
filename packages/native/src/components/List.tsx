import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { ListItem } from "./ListItem";

type Item = {
  id: string;
  label: string;
};

type ListProps = {
  items: Item[];
  onSelect: (id: string, clickArea: number) => void;
};

export const List: React.SFC<ListProps> = ({ items, onSelect }) => {
  const _keyExtractor = (item: Item, _index: number) => item.id;

  const _renderItem: ListRenderItem<Item> = ({ item }) => (
    <ListItem
      key={item.id}
      id={item.id}
      label={item.label}
      onPress={onSelect}
    />
  );

  return (
    <FlatList
      data={items}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
    />
  );
};

export default List;
