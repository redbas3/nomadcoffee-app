import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Login from "../../screens/Login";
import Profile from "../../screens/Profile";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" && <Stack.Screen name="Home" component={Home} />}

      {screenName === "Search" && (
        <Stack.Screen name="Search" component={Search} />
      )}
      {screenName === "Profile" && (
        <Stack.Screen name="Profile" component={Profile} />
      )}
      {screenName === "Login" && (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
