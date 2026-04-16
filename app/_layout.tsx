import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

// Import global CSS pour NativeWind
import "../global.css";

export { ErrorBoundary } from "expo-router";

// Empêche le splash screen de disparaître avant le chargement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [isReady, setIsReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Vérifie si l'utilisateur a complété l'onboarding
  useEffect(() => {
    AsyncStorage.getItem("user_profile").then((data) => {
      setNeedsOnboarding(!data);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isReady]);

  // Redirige vers l'onboarding si nécessaire, après le premier render
  useEffect(() => {
    if (loaded && isReady && needsOnboarding) {
      router.replace("/onboarding");
    }
  }, [loaded, isReady, needsOnboarding]);

  if (!loaded || !isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </>
  );
}
