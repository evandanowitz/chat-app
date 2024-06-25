import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';  // import GiftedChat library for chat interface
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';

const ChatScreen = ({ route, navigation, db, isConnected, storage }) => {
  /* route.params is a React Navigation object. Contains paramaters passed to the ChatScreen when 
    it was navigated to from StartScreen used to unpack properties from objects into variables */
  const { name, bgColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;
  // useEffect gets called right after the ChatScreen component mounts
  useEffect(() => {
    // Each msg with Gifted Chat library requires an ID, a creation date, and user object. Each user object requires at least a user ID, a name, and an avatar
    navigation.setOptions({ title: name });  // set user's name at top of navigation bar

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // onSnapshot() function listener targets the messages collection and makes sure the createdAt property sorts query results in descending order
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      /* The callback onSnapshot() constructs an array of messages from fetched docs and is array is assigned to messages state using setMessages(). 
      Must convert the Timstamp stored at createdAt property of each message to a Date object that Gifted Chat understands. */
      unsubMessages = onSnapshot(q,(documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    // Clean-up code. Call the unsubscribe function of onSnapshot() in useEffect() to clean up the returned function
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
  };

  /* The onSend() function is called when a user sends a message. The append() function appends the new message to the newMessage array. 
  This onSend function saves sent messages on the Firestore database. addDoc() Firestore function saves the passed message to the function in the database 
  Message to be added is the first item in the newMessages array (argument of the onSend function) */
  const onSend = (newMessages) => {
    // Passed newMessages[0] as third argument
    addDoc(collection(db, 'messages'), newMessages[0])
  }

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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // this function is responsible for creating the circle button
  const renderCustomActions = (props) => {
    return <CustomActions 
      storage={storage} // pass storage to CustomActions component so that you can use it in the location where picking images and taking photos takes place
      {...props} // this props object contains Gifted Chat's onSend() method. CustomActions component now has access to onSend()
      userID={userID}
    />;
  };

  // renderCustomView function checks if the currentMessage contains location data. If yes, it will return a MapView
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150, 
            height: 100, 
            borderRadius: 13, 
            margin: 3 
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      )
    }
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Render GiftedChat component that comes with its own props. */}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble} // Add and customize renderBubble component to change speech bubble color
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)} // a way to pass the messages data from the GiftedChat component to the onSend function
        user={{ 
          _id: userID, // _id has value (userID) of the route parameter passed from the StartScreen when logged in anonymously. Extracted from route.params
          name: name // name has the value (name) of the name route parameter passed from StartScreen when logged in anonymously. Extracted from route.params
        }}
      />
      {/* Fix for input field in ChatScreen being hidden by Keyboard on certain Android devices */}
      { Platform.OS === 'android' ? ( <KeyboardAvoidingView behavior='height' /> ) : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ChatScreen;