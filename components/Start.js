import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('white');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
 return (
   <ImageBackground source={require("../assets/BackgroundImage.png")} style={styles.container}>
    <Text style={styles.title}>Chat App</Text>
    <View> 
        <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
        />
        <Text style={styles.text}>Choose you background color:</Text>
        <View style={styles.colors}>
            {colors.map((color, index) => (
                <TouchableOpacity key={index} style={[styles.box, { backgroundColor: color }, background === color && styles.selected,]} onPress={() => setBackground(color)} />
            ))}
        </View>
        <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Chat', { name: name})}>
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
    color: '#FFFFFF'
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
    color: '#757083'
  }, 
  button: {
    backgroundColor: '#757083'
  }, 
  buttonText: {
    fontSize: 16, 
    fontWeight:'600', 
    color: '#FFFFFF' 
  }
});

export default Start;