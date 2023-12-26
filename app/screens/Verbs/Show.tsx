import React from "react";
import { Text, View } from "react-native";

export default function Show({ route, navigation }) {
  const { slug } = route.params;

  return (
    <View>
      <Text>Verbs Show</Text>
      <Text>{slug}</Text>
    </View>
  );
}
