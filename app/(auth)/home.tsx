import { View, Text, StyleSheet, Pressable } from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";

import Button from "../components/Button";

const AuthIndex = () => {
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Auth Index</Text>
      <Text>{auth.currentUser?.email}</Text>

      <Button onPress={() => signOut(auth)} label="Sign Out" variant="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AuthIndex;
