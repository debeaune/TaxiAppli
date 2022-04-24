import { Platform } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from "expo-auth-session";
import axios from 'axios';
import Polyline from '@mapbox/polyline';

export const prefix = Platform.OS === "ios" ? "ios" : "md";

const config = {
    iosClientId:`884646140733-qt36cqvrcfo20ejfhv54o4c9iv06tiij.apps.googleusercontent.com`,
    androidClientId: `884646140733-kv8bum2peil83g6cflsop5bg8bsch0c3.apps.googleusercontent.com`,
};

export const API_KEY = "AIzaSyAlHyKcjM3q3qoaahTIbzeVBLjz-EQXThw";

export const BASE_URL = "https://maps.googleapis.com/maps/api";

export const auth = async () => {
    try{
        const { user, type } = await Google.logInAsync(config);
        //console.log('result', result);
        if(type === "success") {
            // stocker l'utilisateur dans la BDD
            // stocker l'utilisateur dans le mémoire interne
            const { name, photoUrl, email } = user;
            await AsyncStorage.setItem(
              "user", 
              JSON.stringify({
              name,
              photoUrl,
              email
            }));
            // naviguer vers l'écran Home
            console.log('naviguer vers home');
        }
    }
    catch(e){
        console.error("error.auth", e);
    }
};

export const renderInitialScreen = async () => {
    try
    {
       const user =  await AsyncStorage.getItem('user');
       JSON.parse(user);
       return user ? "Home" : "Login";
    }
    catch(e)
    {
        console.error('error render initial screen', e);
    }
};

export const getRoute = async url =>{
    try{
        const {data : {routes }} = await axios.get(url);
        const points = routes[0].overview_polyline.points;
        return points;
    }catch(e){
        console.error('error route', e);
    }
}

export const decodePoint = point => {
    const fixPoints = Polyline.decode(point);
    const route = fixPoints.map(fixPoint =>{
        return {
            latitude:fixPoint[0],
            longitude:fixPoint[1],
        }
    });
    return route;
}

