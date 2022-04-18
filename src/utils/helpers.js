import { Platform, AsyncStorageStatic } from 'react-native';
import * as Google from 'expo-google-app-auth';

export const prefix = Platform.OS === "ios" ? "ios" : "md";

const config = {
    iosClientId:`884646140733-qt36cqvrcfo20ejfhv54o4c9iv06tiij.apps.googleusercontent.com`,
    androidClientId: `884646140733-kv8bum2peil83g6cflsop5bg8bsch0c3.apps.googleusercontent.com`,
};

export const auth = async = () => {
    try{
        const { user,type } = await Google.logInAsync(config);
        //console.log('result', result);
        if(type === "success") {
            // stocker l'utilisateur dans la BDD
            // stocker l'utilisateur dans le mémoire interne
            const { name, photoUrl, email } = user;
            await AsyncStorageStatic.setItem('user', JSON.stringify({
              name,
              photoUrl,
              email
            }));
            // naviguer vers l'écran Home
            console.log('naviguer vers home');
        }
    }
    catch(e){
        conole.error("error.auth", e);
    }
}

