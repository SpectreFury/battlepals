import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { FirebaseError } from "firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      console.log("Signed up: ", user);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);

    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log("Signed up: ", user);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#f3f4f6" : "#fff",
                borderColor: "#e5e7eb",
              },
            ]}
            onPress={signIn}
          >
            <Text style={[styles.buttonText, { color: "#111" }]}>Login</Text>
          </Pressable>
        )}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed ? "#1e293b" : "#111827",
                borderColor: "#111827",
              },
            ]}
            onPress={signUp}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>Signup</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },

  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginVertical: 4,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.01)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
