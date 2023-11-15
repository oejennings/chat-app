import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Alert, LogBox } from 'react-native';
import { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';
import { getStorage } from "firebase/storage";
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // network connectivity status
  const connectionStatus = useNetInfo();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBvdv7AcrafJ0cBOsMB4KC6Nnh1KTQMY20",
    authDomain: "chat-app-6c201.firebaseapp.com",
    projectId: "chat-app-6c201",
    storageBucket: "chat-app-6c201.appspot.com",
    messagingSenderId: "544070228859",
    appId: "1:544070228859:web:8d5a055579eacb0b0fbbde"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
       <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
