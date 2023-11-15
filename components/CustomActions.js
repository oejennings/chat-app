import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
    const onActionPress = () => {}

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissions?.granted) {
           let result = await ImagePicker.launchImageLibraryAsync();
    
          if (!result.canceled) setImage(result.assets[0]);
          else setImage(null)
        }
      };
    
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissions?.granted) {
          let result = await ImagePicker.launchCameraAsync();
    
          if (!result.canceled) setImage(result.assets[0]);
          else setImage(null)
        }
    };

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
    
        if (permissions?.granted) {
          const location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } else {
          Alert.alert("Permissions to read location aren't granted");
        }
      };
    
    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
      },
      wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
      },
      iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
      }, 
});

export default CustomActions;