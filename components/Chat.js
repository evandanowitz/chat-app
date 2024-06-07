import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
  // route.params is a React Navigation object. Contains paramaters passed to the ChatScreen when it was navigated to from StartScreen
    // used to unpack properties from objects into variables
  const { name, bgColor } = route.params;

  // functions in useEffect are executed after the component is rendered/mounted
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text>Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChatScreen;