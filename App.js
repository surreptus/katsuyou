import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Chip({ label }) {
  return (
    <View style={styles.chip}>
      <Text>
        {label}
      </Text>
    </View>
  )
}

function HomeScreen({ title, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>this is the home screen: <Button title="Press Me" onPress={() => navigation.navigate("Detail")}/></Text>

      <TextInput
        autoCorrect={false}
        enterKeyHint='next'
        autoComplete='off'
        autoCapitalize='none'
        style={styles.input}
        placeholder='Enter the conjugated form' />

      <View style={styles.modifiers}>
        <Chip label='Past' />
        <Chip label='Negative' />
        <Chip label='Passive' />
        <Chip label='Past' />
        <Chip label='Negative' />
        <Chip label='Passive' />
      </View>
    </View>
  );
}

function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'red', justifyContent: 'center' }}>
      <Text>details detail details</Text>
      <Text>this is the detail screen: <Button title="Press Me" onPress={() => navigation.navigate("Home")}/></Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen headerShown={false} name="Home" component={HomeScreen} options={{title: "this is my title" }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifiers: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4 
  },
  chip: {
    borderRadius: '50%',
    backgroundColor: 'orange',
    padding: 4,
    paddingHorizontal: 12
  },
  input: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.16)',
    borderRadius: 5,
  }
});
