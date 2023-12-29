import React from "react";
import { View } from "react-native";
import Heading from "../../components/Heading";
import verbs from "../../data/verbs.json";

export default function Show({ route, navigation }) {
  const { slug } = route.params;

  const verb = verbs.find((verb) => verb.slug === slug);

  if (!verb) return null;

  return (
    <View>
      <Heading>{verb.slug}</Heading>
    </View>
  );
}
