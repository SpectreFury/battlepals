import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Pressable,
} from "react-native";

import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";

import Button from "./components/Button";
import GoogleButton from "./components/GoogleButton";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Login failed: " + err.message);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
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
        <View>
          <Button onPress={signIn} variant="light" label="Login" />
          <Button onPress={signUp} variant="dark" label="Sign Up" />
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.line} />
        </View>
        <GoogleButton />
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
  orText: {
    textAlign: "center",
    marginHorizontal: 8,
    color: "#7a7a7a",
    fontWeight: "500",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d1d1",
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#4285F4",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  googleButtonText: {
    color: "#4285F4",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
