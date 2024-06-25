import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet(); // Should return a reference to Gifted Chat's ActionSheet.
  const onActionPress = () => {
    const options = ['Select Photo from Library', 'Take Photo', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    // This reference (object) contains the showActionSheetWithOptions() function, which will initialize and show the ActionSheet.
    actionSheet.showActionSheetWithOptions (
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert('Permissions have not been granted.');
    }
  }

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert('Permissions have not been granted.');
    }
  }

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        // if there is location data, you are sending a message that only contains the location property (though there are other properties added by default, such as createdAt, _id, and user)
        onSend({
          // the object assigned to the location property below contains all the data necessary for renderCustomView to render the MapView in a message bubble
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        });
      } else Alert.alert('Error occurred while fetching location');
    } else Alert.alert('Permissions have not been granted.');
  }

  // function has one argument that represents the picked image's URI. The function combines multiple strings to produce a string that can be used as a unique reference for the iamge to be uploaded.
  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      accessible={true}
      accessibilityLabel='More communication features'
      accessibilityHint='Choose to send an image from your library, take a new photo, send your location, or cancel.'
      accessibilityRole='button'
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1
  },
iconText: {
  color: '#b2b2b2',
  fontWeight: 'bold',
  fontSize: 20,
  backgroundColor: 'transparent',
  textAlign: 'center',
  marginTop: -2.5
}
});