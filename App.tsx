import "react-native-gesture-handler";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PracticeScreen } from "./app/screens/Practice";
import { SettingsScreen } from "./app/screens/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { List, Settings, Zap } from "react-native-feather";
import { StyleSheet } from "react-native";
import { VerbsScreen } from "./app/screens/Verbs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "red",
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
  inactive: {
    color: "gray",
  },
  active: {
    color: "green",
  },
});
