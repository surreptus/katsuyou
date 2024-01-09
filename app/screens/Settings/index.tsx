import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Switch,
  View,
  ScrollView,
} from "react-native";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Stack from "../../components/Stack";

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <Heading variant="subtitle">Settings</Heading>

          <View>
            <Text>Setting 1</Text>
            <Switch />
          </View>

          <View>
            <Text>Setting 2</Text>
            <Switch />
          </View>
        </View>

        <Stack>
          <Heading variant="subtitle">About Katsuyou</Heading>

          <Text>
            I made Katsuyou as a way to practice Japanese verb conjugations,
            transitive/intransitive pairs, and other useful phrases. I have
            learned Japanese through many other wonderful free resources like
            Tae Kim's Guide to Japanese, Anki Decks, and YouTubers. I wanted to
            contribute something people could use as a another free tool. I hope
            you find Katsuyou useful!
          </Text>

          <Text>
            If you really want to support me, you can buy me a coffee. I would
            really appreciate it!
          </Text>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    padding: 8,
    fontSize: 24,
    fontWeight: "bold",
  },
});
