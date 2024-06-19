import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'; // import GiftedChat library for chat interface
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

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

  // useEffect gets called right after the ChatScreen component mounts
  useEffect(() => {
    // Each msg with Gifted Chat library requires  an ID, a creation date, and user object. Each user object requires at least a user ID, a name, and an avatar
    navigation.setOptions({ title: name }); // set user's name at top of navigation bar
    // onSnapshot() function listener targets the messages collection and makes sure the createdAt property sorts query results in descending order
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    /* The callback onSnapshot() constructs an array of messages from fetched docs and is array is assigned to messages state using setMessages(). 
    Must convert the Timstamp stored at createdAt property of each message to a Date object that Gifted Chat understands. */
    const unsubMessages = onSnapshot(q,(documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({ 
          id: doc.id, 
          ...doc.data(), 
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    });

    // Clean-up code. Call the unsubscribe function of onSnapshot() in useEffect() to clean up the returned function
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  /* The onSend() function is called when a user sends a message. The append() function appends the new message to the newMessage array. 
  This onSend function saves sent messages on the Firestore database. addDoc() Firestore function saves the passed message to the function in the database 
  Message to be added is the first item in the newMessages array (argument of the onSend function) */
  const onSend = (newMessages) => {
    // Passed newMessages[0] as third argument
    addDoc(collection(db, 'messages'), newMessages[0])
  }

  const renderBubble = (props) => {
    // returned Bubble component is from Gifted Chat's own package. Must import it.
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' },
          left: { backgroundColor: '#fff' }
        }}
      />
    )
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
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ChatScreen;