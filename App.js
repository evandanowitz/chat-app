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
  // Chat app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA6VxEofP-5AOctHSpX4NNP6rEdEHJT-VA",
    authDomain: "chat-app-eaa8e.firebaseapp.com",
    projectId: "chat-app-eaa8e",
    storageBucket: "chat-app-eaa8e.appspot.com",
    messagingSenderId: "346516409691",
    appId: "1:346516409691:web:a14f1832e92c019a775e7e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

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