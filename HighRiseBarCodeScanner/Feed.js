import React from "react";
import Scanner from "./Scanner";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidUpdate() {
    const { navigation } = this.props;

    let data = navigation.getParam("data");
    console.log(data);
    if (data !== undefined) {
      try {
        await fetch("https://familyexpenses.herokuapp.com/api/category", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data,
          }),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const { navigation } = this.props;

    if (navigation.getParam("data") === undefined) {
      return (
        <View>
          <Text>Feed Screen</Text>
          <Button
            title="Go scanner"
            onPress={() => this.props.navigation.navigate("Scanner")}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Feed Screen</Text>
          <Button
            title="Go scanner"
            onPress={() => this.props.navigation.navigate("Scanner")}
          />
          <Text>content: {navigation.getParam("data")}</Text>
        </View>
      );
    }
  }
}

// const AppNavigator = createStackNavigator({
//   Home: Feed,
// });

// export default createAppContainer(AppNavigator);
