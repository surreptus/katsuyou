import React from "react";
import { Button, Linking, ScrollView, View } from "react-native";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import verbs from "../../data/verbs.json";

export default function Show({ route, navigation }) {
  const { slug } = route.params;

  const verb = verbs.find((verb) => verb.slug === slug);

  if (!verb) return null;

  return (
    <ScrollView>
      <Heading>{verb.slug}</Heading>

      {verb.senses.map((sense, index) => {
        return (
          <View key={`${slug}-${index}`} style={{ padding: 8 }}>
            <Text>{sense.english_definitions.join(", ")}</Text>
            <Text variant="caption">{sense.info}</Text>
          </View>
        );
      })}

      <Button
        onPress={() => Linking.openURL("https://google.com")}
        title="Open Jisho"
      />
    </ScrollView>
  );
}
