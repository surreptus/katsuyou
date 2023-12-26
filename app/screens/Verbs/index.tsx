import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  View,
  TextInput,
  VirtualizedList,
  Pressable,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Text from "../../components/Text";
import verbs from "../../../data/verbs.json";
import Heading from "../../components/Heading";
import Show from "./Show";

const Stack = createStackNavigator();

const List = ({ navigation }) => {
  const [filter, setFilter] = useState("");

  function handleFilter(text: string) {
    setFilter(text);
  }

  const filtered = verbs.filter((verb) => verb.slug.includes(filter));

  return (
    <SafeAreaView style={styles.container}>
      <Heading>Verbs</Heading>

      <TextInput
        style={styles.filter}
        value={filter}
        onChangeText={handleFilter}
      />

      <VirtualizedList
        data={filtered}
        getItemCount={() => filtered.length}
        keyExtractor={(item: any) => item.slug}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.push("Show", { slug: item.slug })}
            key={item.slug}
          >
            <View style={styles.item}>
              <Text>{item.slug}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export const VerbsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Verbs" component={List} />
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
