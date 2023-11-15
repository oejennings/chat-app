import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';

const CustomActions = ({}) => {

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissions?.granted) {
           let result = await ImagePicker.launchImageLibraryAsync();
    
          if (!result.canceled) setImage(result.assets[0]);
          else setImage(null)
        }
      }
    
    return (

    )
}

const styles = StyleSheet.create({

});

export default CustomActions;