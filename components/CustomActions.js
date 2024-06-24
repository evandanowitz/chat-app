import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
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