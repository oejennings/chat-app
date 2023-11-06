import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
   
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: "React Native",
                  avatar: "https://placeimg.com/140/140/any",
                }, 
            },
            {
                _id: 2,
                text: 'You have entered the chat',
                createdAt: new Date(),
                system: true,
              },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name })
    }, []);
    
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                backgroundColor: "#FFF"
                },
                left: {
                backgroundColor: "#000"
                }
            }}
            />
        }

 return (
   <View style={[styles.container, {backgroundColor: color}]}>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;