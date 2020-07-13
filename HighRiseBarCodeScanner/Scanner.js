// import React from "react";
// import { View, Text } from "react-native";
// import Feed from "./Feed";
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// class Scanner extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Scanner Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Scanner: Scanner,
// });

// export default createAppContainer(AppNavigator);

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.navigation.navigate("Home", {
      data: data,
    });
    // try {
    //   await fetch("https://familyexpenses.herokuapp.com/api/category", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: data,
    //     }),
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
