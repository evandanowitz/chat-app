import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import GiftedChat library for chat interface

const ChatScreen = ({ route, navigation }) => {
  /* route.params is a React Navigation object. Contains paramaters passed to the ChatScreen when 
  it was navigated to from StartScreen used to unpack properties from objects into variables */
  const { name, bgColor } = route.params;
  // messages state makes sense here, as a chat app needs to send, receive, and display messages.
  const [messages, setMessages] = useState([]);

  // the onSend() function is called when a user sends a message.
  // the append() function appends the new message to the newMessage array.
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // this useEffect function gets called right after the ChatScreen component mounts
  useEffect(() => {
    navigation.setOptions({ title: name }); // functions in useEffect execute after component mounts
    setMessages([
      /* Messages must follow a certain format to work with Gifted Chat library. 
      Each message requires an ID, a creation date, and a user object.
      Each user object requires at least a user ID, name, and avatar. */
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const renderBubble = (props) => {
    // returned Bubble component is from Gifted Chat's own package. Must import it.
    return <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000' },
        left: { backgroundColor: '#fff' }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Render GiftedChat component that comes with its own props. */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble} // Add and customize renderBubble component to change speech bubble color
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
      />
      {/* Fix for input field in ChatScreen being hidden by Keyboard on certain Android devices */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ChatScreen;