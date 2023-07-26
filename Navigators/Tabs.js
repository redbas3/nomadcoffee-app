import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavFactory from "../components/nav/StackNavFactory";
import TabIcon from "../components/nav/TabIcon";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255, 255, 255, 0.3)",
        },
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
          marginTop: -5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TabHome"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <TabIcon focused={focused} iconName={"home"} color={color} />
            );
          },
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <TabIcon focused={focused} iconName={"search"} color={color} />
            );
          },
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tab.Screen>
      {isLoggedIn ? (
        <Tab.Screen
          name="TabProfile"
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <TabIcon focused={focused} iconName={"person"} color={color} />
              );
            },
          }}
        >
          {() => <StackNavFactory screenName="Profile" />}
        </Tab.Screen>
      ) : (
        <Tab.Screen
          name="TabLogin"
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <TabIcon focused={focused} iconName={"person"} color={color} />
              );
            },
          }}
        >
          {() => <StackNavFactory screenName="Login" />}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
