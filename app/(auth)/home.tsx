import { View, Text, StyleSheet, Pressable } from "react-native";

import auth from "@react-native-firebase/auth";

const AuthIndex = () => {
  const user = auth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Auth Index</Text>
      <Text>{user.currentUser?.email}</Text>

      <Pressable onPress={() => auth().signOut()} style={styles.button}>
        <Text>Sign Out</Text>
      </Pressable>
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
