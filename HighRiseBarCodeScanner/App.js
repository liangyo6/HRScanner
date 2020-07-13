import { StatusBar } from "expo-status-bar";
import Scanner from "./Scanner";
import Feed from "./Feed";
import React from "react";
import { createAppContainer } from "react-navigation";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    Scanner: Scanner,
    Home: Feed,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
