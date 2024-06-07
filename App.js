import { StyleSheet } from 'react-native';
import StartScreen from './components/Start.js';
import ChatScreen from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="StartScreen"
      >
        <Stack.Screen 
          name="StartScreen" 
          component={StartScreen} 
        />
        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
        />
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