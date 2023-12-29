import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  VirtualizedList,
  Pressable,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Text from "../../components/Text";
import Heading from "../../components/Heading";
import verbs from "../../data/verbs.json";
import Show from "./Show";
import * as types from "../../types";

const Stack = createStackNavigator();

interface ItemProps {
  item: types.Verb;
  handleNavigate: (slug: string) => void;
}

function Item({ item, handleNavigate }: ItemProps) {
  return (
    <Pressable onPress={() => handleNavigate(item.slug)} key={item.slug}>
      <View style={styles.item}>
        <Text>{item.slug}</Text>
        <Text variant="caption">{item.senses[0].english_definitions[0]}</Text>
      </View>
    </Pressable>
  );
}

const List = ({ navigation }) => {
  const [filter, setFilter] = useState("");

  function handleFilter(text: string) {
    setFilter(text);
  }

  const filtered = verbs.filter((verb) => verb.slug.includes(filter));

  function handlePress(slug: string) {
    return navigation.push("Show", { slug });
  }

  return (
    <View>
      <Heading>Verbs</Heading>

      <TextInput
        style={styles.filter}
        value={filter}
        onChangeText={handleFilter}
      />

      <VirtualizedList
        data={filtered}
        getItemCount={() => filtered.length}
        keyExtractor={(item: types.Verb) => item.slug}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <Item item={item} handleNavigate={handlePress} />
        )}
      />
    </View>
  );
};

export const VerbsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Show" component={Show} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  heading: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  filter: {
    fontSize: 32,
    padding: 8,
    backgroundColor: "#f3f3f3",
  },
  item: {
    padding: 10,
  },
});
