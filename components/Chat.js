import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, color, userID} = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
        setMessages(JSON.parse(cachedMessages));
      };
   
    useEffect(() => {
        navigation.setOptions({ title: name });
        if (isConnected === true) {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
            })
        } else loadCachedMessages
        
        return () => {
          if (unsubMessages) unsubMessages();
        }  
    }, []);

   
    
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                backgroundColor: "#00F"
                },
                left: {
                backgroundColor: "#FFF"
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
        _id: userID,
        name: name
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