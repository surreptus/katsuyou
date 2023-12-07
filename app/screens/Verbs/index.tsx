import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  TextInput,
  VirtualizedList,
} from "react-native";
import verbs from "../../../data/verbs.json";

function renderItem({ item }) {
  return (
    <TouchableHighlight key={item.slug}>
      <View style={styles.item}>
        <Text>{item.slug}</Text>
      </View>
    </TouchableHighlight>
  );
}

export const VerbsScreen = () => {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);

  function handleFilter(text: string) {
    setFilter(text);
  }

  function handleSelect(verb) {
    setSelected(verb);
  }

  const filtered = verbs.filter((verb) => verb.slug.includes(filter));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Verbs {selected?.slug}</Text>

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
        renderItem={renderItem}
      />
    </SafeAreaView>
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
