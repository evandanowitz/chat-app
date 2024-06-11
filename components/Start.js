import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const imageBackground = require('../assets/background-img.png');
  const [bgColor, setBgColor] = useState('');
  // Add icon image from assets folder to TextInput using Image component from react-native

  return (
    <View style={styles.container}> {/* Entire component container */}
      <ImageBackground style={styles.imageBackground} source={imageBackground}> {/* App image background */}
        <Text style={styles.title}>Chat App</Text> {/* App Title */}
        <View style={styles.box}> {/* View component holding all main elements */}
          <TextInput style={styles.textInput} // TextInput
            value={name}
            onChangeText={setName}
            placeholder='Your Name' 
          />
          <View style={styles.bgColorBox}> {/* Entire background color element */}
            <Text style={styles.chooseBgColorText}>Choose Background Color:</Text> {/* Choose Background Color text */}
            <View style={styles.bgColorButtonsContainer}> {/* Container holding all background color buttons */}
              <TouchableOpacity // Individual background color button
                style={[ styles.bgColorButtons, 
                  { backgroundColor: '#090C08' }, 
                  bgColor === '#090C08' && styles.selectedBgColor
                ]} 
                onPress={() => setBgColor('#090C08')} />
              <TouchableOpacity // Individual background color button
                style={[ styles.bgColorButtons, 
                  { backgroundColor: '#474056' }, 
                  bgColor === '#474056' && styles.selectedBgColor
                ]}  
                onPress={() => setBgColor('#474056')} />
              <TouchableOpacity // Individual background color button
                style={[ styles.bgColorButtons, 
                  { backgroundColor: '#8A95A5' }, 
                  bgColor === '#8A95A5' && styles.selectedBgColor
                ]}  
                onPress={() => setBgColor('#8A95A5')} />
              <TouchableOpacity // Individual background color button
                style={[ styles.bgColorButtons, 
                { backgroundColor: '#B9C6AE' }, 
                bgColor === '#B9C6AE' && styles.selectedBgColor
                ]} 
                onPress={() => setBgColor('#B9C6AE')} />
            </View>
          </View>
          <TouchableOpacity style={styles.chatButton} // Chat button. TouchableOpacity more customizable. Added bgColor to navigate.
            title='Start Chatting'
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
  container: { // Entire app container for main View component
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: { // Text input where users put in their name to be displayed in chat screen
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    padding: 15,
    width: '88%',
    borderWidth: 1,
    marginTop: 20,
  },
  chatButton: { // Actual chat button
    width: '88%',
    backgroundColor: '#757083',
    padding: 15,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center'
  },
  chatButtonText: { // Text displaying on chat button
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  title: { // App title
    position: 'absolute',
    top: 0,
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 100
  },
  bgColorBox: { // Holds everything related to background color stuff
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  chooseBgColorText: { // Text that tells users to choose their background color of choice
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
    marginBottom: 20
  },
  bgColorButtonsContainer: { // Container holding all background color buttons
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bgColorButtons: { // Individual background color buttons
    width: 40,
    height: 40,
    borderRadius: 20
  },
  selectedBgColor: { // Background color that was selected by user
    borderWidth: 3,
    borderColor: '#000'
  },
  imageBackground: { // Background image for app's main screen
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: { // View component holding TextInput, background color stuff, and chat button
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default StartScreen;