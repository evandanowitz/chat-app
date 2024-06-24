import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { StyleSheet, LogBox, Alert } from 'react-native';
// Import the screen components
import StartScreen from './components/Start.js';
import ChatScreen from './components/Chat.js';
// Import Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
// Import Storage
import { getStorage } from 'firebase/storage';
// Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(
  [
    'AsyncStorage has been extracted from', 
    '@firebase/auth:',
    'Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
  ]
);

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

  const app = initializeApp(firebaseConfig); // Initialize Firebase
  const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
  const storage = getStorage(app); // Initialize the storage handler
  
  const connectionStatus = useNetInfo(); // useNetInfo returns latest value of network connection state

  // a real-time network connectivity detection system in useEffect
  useEffect(() => {
    // if no connection, alert user. Firebase WILL NOT attempt to reconnect to Firestore Database
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
      // if connection is recognized, Firebase WILL attempt to reconnect to Firestore Database
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]); // isConnected prop represents the conneciton status

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='StartScreen' component={StartScreen} />
        <Stack.Screen name='ChatScreen'>
          {props => <ChatScreen isConnected={connectionStatus.isConnected} db={db} {...props} /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;