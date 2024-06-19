import { StyleSheet, LogBox } from 'react-native';

// Import the screen components
import StartScreen from './components/Start.js';
import ChatScreen from './components/Chat.js';

// Import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='StartScreen'
      >
        <Stack.Screen 
          name='StartScreen' 
          component={StartScreen} 
        />
        <Stack.Screen 
          name='ChatScreen'
        >
          {props => <ChatScreen db={db} {...props} />}
        </Stack.Screen>
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
});

export default App;