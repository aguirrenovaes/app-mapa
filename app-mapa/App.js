import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions  } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';

export default function App() {
  let latitute;
  let longitude;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      setLocation(location);
      // latitudelocation = location.latitude;
      // longitudelocation = location.longitude;
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.12312,
          longitude: -321.321321,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text : {
    fontSize : 16
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  
  },
});
