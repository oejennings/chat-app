import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
 return (
   
   <View style={styles.container}>
     <Text style={styles.title}>Chat App</Text>
     <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Your Name'
      />
      <Text style={styles.text}>Choose you background color:</Text>
     <TouchableOpacity
       title="Start Chatting"
       onPress={() => navigation.navigate('Chat', { name: name})}
     />
   </View>
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
    fontSize: 16, 
    fontWeight:'600', 
    color: '#FFFFFF' 
  }
});

export default Start;