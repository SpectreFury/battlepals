import { Stack } from "expo-router";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";

export default function RootLayout() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const auth = getAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (initializing) {
        setInitializing(false);
      }

      setUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/(auth)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
