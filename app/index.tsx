import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from "react-native";

import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@react-native-firebase/auth";

import Button from "./components/Button";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Login failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Battlepals</Text>
        <Text style={styles.subtitle}>
          An application to be more consistent with the help of your friends.
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
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
        <Button onPress={signIn} variant="light" label="Login" />
        <Button onPress={signUp} variant="dark" label="Sign Up" />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    marginTop: 200,
    alignItems: "center",
  },

  formContainer: {
    marginTop: 100,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#7a7a7a",
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 8,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.2,
  },

  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
