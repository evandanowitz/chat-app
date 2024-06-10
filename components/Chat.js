import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import GiftedChat library for chat interface

const ChatScreen = ({ route, navigation }) => {
  // route.params is a React Navigation object. Contains paramaters passed to the ChatScreen when it was navigated to from StartScreen
    // used to unpack properties from objects into variables
  const { name, bgColor } = route.params;
  // messages state makes sense here, as a chat app needs to send, receive, and display messages.
  const [messages, setMessages] = useState([]);

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