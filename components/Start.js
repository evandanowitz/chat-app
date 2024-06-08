import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const imageBackground = require('../assets/background-img.png');
  // Add icon image from assets folder to TextInput using Image component from react-native
  const [bgColor, setBgColor] = useState('');

  return (
    // Entire component container
    <View style={styles.container}>
      {/* App image background */}
      <ImageBackground style={styles.imageBackground} source={imageBackground}>
        {/* App Title */}
        <Text style={styles.title}>Chat App</Text>
        {/* View component holding all main elements */}
        <View style={styles.box}>
          {/* TextInput */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
          {/* Entire background color element */}
          <View style={styles.bgColorBox}>
            {/* Choose Background Color text */}
            <Text style={styles.chooseBgColorText}>Choose Background Color:</Text>
            {/* Container holding all background color buttons */}
            <View style={styles.bgColorButtonsContainer}>
              {/* Individual background color button */}
              <TouchableOpacity 
                style={[
                  styles.bgColorButtons, 
                  { backgroundColor: '#090C08' }, 
                  bgColor === '#090C08' && styles.selectedBgColor
                ]}
                onPress={() => setBgColor('#090C08')}
              />
              {/* Individual background color button */}
              <TouchableOpacity
                style={[
                  styles.bgColorButtons, 
                  { backgroundColor: '#474056' }, 
                  bgColor === '#474056' && styles.selectedBgColor
                ]}  
                onPress={() => setBgColor('#474056')}
              />
              {/* Individual background color button */}
              <TouchableOpacity
                style={[
                  styles.bgColorButtons, 
                  { backgroundColor: '#8A95A5' }, 
                  bgColor === '#8A95A5' && styles.selectedBgColor
                ]}  
                onPress={() => setBgColor('#8A95A5')}
              />
              {/* Individual background color button */}
              <TouchableOpacity
                style={[
                  styles.bgColorButtons, 
                  { backgroundColor: '#B9C6AE' }, 
                  bgColor === '#B9C6AE' && styles.selectedBgColor
                ]}  
                onPress={() => setBgColor('#B9C6AE')}
              />
            </View>
          </View>
          
          {/* Start Chat button. TouchableOpacity is a more customizable button. Added bgColor to navigate */}
          <TouchableOpacity 
            style={styles.chatButton}
            title="Start Chatting"
            onPress={() => navigation.navigate('ChatScreen', { name: name, bgColor: bgColor })}
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

// STILL NEED TO CUT DOWN ON DUPLICATE CODE LINES IN STYLES. See Exercise 5.1
const styles = StyleSheet.create({
  // Entire app container for main View component
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Text input where users put in their name to be displayed in chat screen
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    padding: 15,
    width: '88%',
    borderWidth: 1,
    marginTop: 20,
  },
  // Actual chat button
  chatButton: {
    width: '88%',
    backgroundColor: '#757083',
    padding: 15,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center'
  },
  // Text displaying on chat button
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  // App title
  title: {
    position: 'absolute',
    top: 0,
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 100
  },
  // Holds everything related to background color stuff
  bgColorBox: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  // Text that tells users to choose their background color of choice
  chooseBgColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginBottom: 20
  },
  // Container holding all background color buttons
  bgColorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  // Individual background color buttons
  bgColorButtons: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  // Background color that was selected by user
  selectedBgColor: {
    borderWidth: 3,
    borderColor: '#000'
  },
  // Background image for app's main screen
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // View component holding TextInput, background color stuff, and chat button
  box: {
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default StartScreen;