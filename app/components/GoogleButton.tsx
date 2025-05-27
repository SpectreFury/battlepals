import { getAuth, GoogleAuthProvider } from "@react-native-firebase/auth";
import { signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { GOOGLE_WEB_CLIENT_ID } from "../../constants/config";

const GoogleButton = () => {
  const auth = getAuth();

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error("No ID token found");
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);

    return signInWithCredential(auth, googleCredential);
  };

  const signInWithGoogle = async () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });

    try {
      await onGoogleButtonPress();
    } catch (e) {
      alert("Google Login failed: " + e);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.googleButton} onPress={signInWithGoogle}>
        <View style={styles.buttonContent}>
          <Image
            source={require("../../assets/google-logo.png")}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  googleButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#dadce0",
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    color: "#3c4043",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default GoogleButton;
