import React, {useState, useEffect} from 'react';
import { 
    View, 
    Dimensions, 
    StyleSheet, 
    ActivityIndicator, 
    TouchableWithoutFeedback,
    Keyboard 
} from "react-native";
import Constants from 'expo-constants';
import MapView from "react-native-maps";
import * as Location from 'expo-location';

import PlaceInput from '../components/PlaceInput';

const initialState = { latitude: null, longitude: null};
const { width, height } = Dimensions.get('window');
const PassengerScreen = props => {
    const [state,setState] = useState(initialState);
    const { latitude, longitude } = state;
    const { container, mapStyle } = styles;
    const getUserLocation = async() => {
        try{
             const { 
                coords : { latitude, longitude }
            } = await Location.getCurrentPositionAsync();
            setState(prevState => ({
                ...prevState,
                latitude,
                longitude
            }));
        } catch (e) {
            console.error("error getUserLocation", e);
        }
    };

    useEffect(() => {
        getUserLocation();
    },[]);
    if(!latitude || !longitude) {
        return (
            <View style={container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={container}>
                <MapView 
                    style={mapStyle} 
                    showUserLocation 
                    followUserLocation
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta:0.015,
                        longitudeDelta:0.121
                    }} 
                />
                <PlaceInput latitude={latitude} longitude={longitude} />
            </View>
        </TouchableWithoutFeedback>   
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: Constants.statusBarHeight,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    mapStyle: {
        width,
        height
    }
});

export default PassengerScreen;