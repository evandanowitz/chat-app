# ChatterBox

## Description

**ChatterBox** is a native, mobile chat app built using **React Native**, **Expo**, and **Google Firestore Database**, and is optimized for both Android and iOS devices. The app provides users with a chat interface as well as options to share images and their location.

## Application Features

- Display a page where users can enter their name and choose a background color for the chat screen before joinging the chat
- A page displaying the user's conversation and an input field and submit button
- Three additional communication features--the ability to select an image from the user's library, take a new image with their camera, and send their location data
- Ability to store data online and offline

## Installation and Usage
# Prerequisites

**Step 1.** Ensue you have Node.js (version 16.19.0 or lower) installed on your system:
  - nvm install 16.19.0
  - nvm use 16.19.0
  - nvm alias default 16.19.0
**Step 2.** Install the Expo CLI (command-line interface) globally on your machine by running the following command in your terminal (this may take a few minutes): npm install -g expo-cli
**Step 3.** You have created an [Expo account](https://expo.dev/signup)
- In your terminal, login to Expo with expo login (you can view the currently logged-in account with expo whoami)
**Step 4.** You have downloaded the [Expo Go](https://expo.dev/go) app from the app store relevant to your device
- Download the Expo Go app from the relevant app store for your device (iOS or Android) to be able to run Chatterbox on your device
**Step 5.** If you want to run the app on an Andorid emulator, [download and install Android Studio](https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio#0) and set up an [Android Virtual Device](https://developer.android.com/studio/run/emulator) (AVD).

# Installation Instructions

**Step 1.** Clone the [project repository](https://github.com/evandanowitz/chat-app) from GitHub to your machine:
- git clone <repository-url> (replace <repository-url> with the actual repository URL)
**Step 2.** Navigate to the chat-app project directory:
-  cd chat-app
**Step 3.** Make sure that all dependencies listed in the "Dependencies" section below are installed:
-  npm install
**Step 4.** Create a new Firebase project and configure Firestore and Storage from the [Firebase Console](https://console.firebase.google.com/)
-  Copy the Firebase config code from Firebase and replace the default config code that was pre-populated in App.js
**Step 5.** Start the Expo development server:
-  npx expo start
-  Your app will build and run on your device using Metro Builder. Press 'a' for Android emulator, "i" for iOS simulator, "w" for web browser, or you can use the Expo Go app from the App Store or Google Play Store.

## Technologies

- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.dev/)
- [Google Firestore Database](https://firebase.google.com/docs/firestore)
- [Google Firebase authentication](https://firebase.google.com/docs/auth)
- [Firebase Cloud Storage](https://firebase.google.com/docs/storage)
- [Gifted Chat library](https://github.com/FaridSafi/react-native-gifted-chat)
- [Android Studio](https://developer.android.com/reference/org/w3c/dom/Document)

## Dependencies

@expo/metro-runtime: ~3.2.1
@react-native-async-storage/async-storage: 1.23.1
@react-native-community/netinfo: 11.3.1
@react-navigation/native: ^6.1.17
@react-navigation/native-stack: ^6.9.26
expo: ~51.0.10
expo-image-picker: ~15.0.5
expo-location: ~17.0.1
expo-media-library: ~16.0.3
expo-status-bar: ~1.12.1
firebase: ^10.12.2
react: 18.2.0
react-dom: ^18.2.0
react-native: ^0.74.2
react-native-gifted-chat: ^2.4.0
react-native-maps: ^1.15.6
react-native-safe-area-context: 4.10.1
react-native-screens: 3.31.1
react-native-web: ^0.19.12
uuid: ^10.0.0

## Developer Dependencies

- @babel/core: ^7.20.0

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.

- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.

- As a user, I want to send images to my friends to show them what I’m currently doing.

- As a user, I want to share my location with my friends to show them where I am.

- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.

- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface
