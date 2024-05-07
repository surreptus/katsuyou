import "react-native-gesture-handler";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List, Settings, Zap } from "react-native-feather";
import { PlatformColor, StyleSheet } from "react-native";
import { PracticeScreen } from "./app/screens/Practice";
import { SettingsScreen } from "./app/screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { VerbsScreen } from "./app/screens/Verbs";
import { theme } from "./app/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={styles.scene}
        screenOptions={{
          tabBarStyle: styles.bar,
          headerShown: false,
        }}
        initialRouteName="Practice"
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => <Zap color={color} />,
          }}
          name="Practice"
          component={PracticeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => <List color={color} />,
          }}
          name="Verbs"
          component={VerbsScreen}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarIcon: ({ color }) => <Settings color={color} />,
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: PlatformColor("systemFill"),
  },
  bar: {
    backgroundColor: PlatformColor("tertiarySystemFill"),
  },
  inactive: {
    color: "gray",
  },
  active: {
    color: "green",
  },
});
