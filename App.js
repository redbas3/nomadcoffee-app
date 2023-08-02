import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import React, { useEffect, useCallback, useState } from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, usernameVar, cache } from "./apollo";
import Tabs from "./Navigators/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        // await Font.loadAsync(Entypo.font);
        // await Font.loadAsync(Ionicons.font);

        const images = loadImages([require("./assets/coffeeShop1.jpg")]);
        // await Asset.loadAsync(require('./1600x800_1.jpeg'));
        // await Image.prefetch("https://reactnative.dev/docs/assets/GettingStartedCongratulations.png")

        const token = await AsyncStorage.getItem("token");
        const username = await AsyncStorage.getItem("username");
        if (token) {
          tokenVar(token);
          usernameVar(username);
          isLoggedInVar(true);
        }

        await persistCache({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
        });

        await Promise.all([...fonts, ...images]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Tabs />
      </NavigationContainer>
    </ApolloProvider>
  );
}
