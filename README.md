# 🚖 Taxi App — React Native + Expo

A real-time taxi application built with React Native and Expo. Connects drivers and passengers using Socket.IO for real-time communication and Google Maps for geolocation.

---

## 🚀 Technologies

- **React Native** — Mobile UI framework
- **Expo** — Development platform
- **Socket.IO** — Real-time communication between driver and passenger
- **Google Maps API** — Maps, geolocation, directions
- **Google Places API** — Address autocomplete
- **Expo Location** — GPS positioning
- **React Navigation** — Screen navigation
- **Expo Google Auth** — Google authentication

---

## ✅ Features

- 🔐 Google Authentication
- 🗺️ Real-time map with driver position
- 📍 Address search with autocomplete (Google Places)
- 🚖 Driver/Passenger matching via Socket.IO
- 🛣️ Route display with Polyline
- 📱 Compatible iOS and Android
- 🔔 Ride request alerts for drivers

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Block.js          # Curved header container
│   ├── LoginBtn.js       # Google login button
│   ├── PlaceInput.js     # Address search with autocomplete
│   ├── Prediction.js     # Address suggestion item
│   ├── RoundBtn.js       # Circular icon button
│   └── Title.js          # Dynamic title (big/medium/small)
├── screens/
│   ├── LoginScreen.js    # Google authentication
│   ├── HomeScreen.js     # Driver/Passenger choice
│   ├── PassengerScreen.js # Passenger map view
│   └── DriverScreen.js   # Driver map view
└── utils/
    └── helpers.js        # Constants and utility functions
```

---

## 🧠 Key Technical Concepts

### Real-time with Socket.IO
```javascript
// Driver sends position
io.emit('requestPassenger', { lat, long });

// Driver listens for requests
io.on('requestTaxi', passInfo => { ... });
```

### Google Places Autocomplete
```javascript
const url = `${BASE_URL}/place/autocomplete/json?key=${API_KEY}&input=${value}&location=${lat},${long}&radius=2000`
```

### Platform-specific Navigation (iOS/Android)
```javascript
const url = Platform.OS === "ios" ? iosUrl : androidUrl;
```

---

## ⚙️ Installation

```bash
git clone https://github.com/debeaune/TaxiAppli
cd TaxiAppli
npm install
npx expo start
```

Create a `.env` file with your API keys:
```
GOOGLE_API_KEY=your_google_api_key
SERVER_URL=your_socket_server_url
```

---

## 🔑 Required API Keys

- **Google Maps API**
- **Google Places API**
- **Google Directions API**
- **Google Auth**

All available on [Google Cloud Console](https://console.cloud.google.com)

---

*Built by Marie Laure Debeaune*
