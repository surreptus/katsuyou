import React, { memo, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  VirtualizedList,
  Pressable,
  SafeAreaView,
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

const Item = memo(function Item({ item, handleNavigate }: ItemProps) {
  return (
    <Pressable onPress={() => handleNavigate(item.slug)} key={item.slug}>
      <View style={styles.item}>
        <Text>{item.slug}</Text>
        <Text variant="caption">{item.senses[0].english_definitions[0]}</Text>
      </View>
    </Pressable>
  );
});

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
    <SafeAreaView>
      <View style={styles.container}>
        <Heading variant="subtitle">Verbs</Heading>

        <TextInput
          style={styles.filter}
          value={filter}
          placeholder="Search for a verb ..."
          onChangeText={handleFilter}
        />

        <VirtualizedList
          data={filtered}
          getItemCount={() => filtered.length}
          keyExtractor={(item: types.Verb) => item.slug}
          getItem={(data, index) => data[index]}
          renderItem={({ item }) => (
            <Item item={item} handleNavigate={handlePress} key={item.slug} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const VerbsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Show" component={Show} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  heading: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
  filter: {
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
  },
  item: {
    padding: 10,
  },
});
