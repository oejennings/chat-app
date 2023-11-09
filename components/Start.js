import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('white');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
        .then( result => {
          navigation.navigate('Chat', {name: name, color: background, id: result.user.uid});
          Alert.alert('Signed in succeccfully');
        }).catch((error) => {
          Alert.alert('Unable to signin, try later');
        })
      }

 return (
   <ImageBackground source={require("../assets/BackgroundImage.png")} style={styles.container}>
    <Text style={styles.title}>Chat App</Text>
    <View style={styles.inputContainer}> 
        <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
        />
        <Text style={styles.text}>Choose you background color:</Text>
        <View style={styles.colors}>
            {colors.map((color, index) => (
                <TouchableOpacity key={index} style={[styles.circle, { backgroundColor: color }, background === color && styles.selected,]} onPress={() => setBackground(color)} />
            ))}
        </View>
        <TouchableOpacity style={styles.button}
            onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 title: {
    fontSize: 45, 
    fontWeight: '600',
    color: '#FFFFFF', 
    marginTop: 70
 },
 inputContainer: {
    width: '88%',
    height: '44%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
 },
 textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15, 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#757083', 
  },
  text: {
    fontSize: 16, 
    fontWeight: '300', 
    color: '#757083', 
    marginBottom: 10
  },
  colors: {
    flexDirection: 'row',
  }, 
  circle: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
  },
  button: {
    width: '88%',
    margin: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#757083'
  }, 
  buttonText: {
    fontSize: 16, 
    fontWeight:'600', 
    color: '#FFFFFF' 
  }
});

export default Start;