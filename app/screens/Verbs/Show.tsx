import React from "react";
import { StyleSheet, Button, Linking, ScrollView, View } from "react-native";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import verbs from "../../data/verbs.json";

export default function Show({ route, navigation }) {
  const { slug } = route.params;

  navigation.setOptions({ title: slug });

  const verb = verbs.find((verb) => verb.slug === slug);

  if (!verb) return null;

  return (
    <ScrollView style={styles.container}>
      <Heading>{verb.slug}</Heading>

      {verb.senses.map((sense, index) => {
        return (
          <View key={`${slug}-${index}`}>
            <Text>{sense.english_definitions.join(", ")}</Text>
            <Text variant="caption">{sense.info}</Text>
          </View>
        );
      })}

      <Button
        onPress={() => Linking.openURL(`https://jisho.org/search/${slug}`)}
        title="Open Jisho"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
