import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:firebase_auth/firebase_auth.dart';

class LoginPageWidget extends StatefulWidget {
  const LoginPageWidget({super.key});

  @override
  State<LoginPageWidget> createState() => _LoginPageWidgetState();
}

class _LoginPageWidgetState extends State<LoginPageWidget> {
  Future<UserCredential?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

      final GoogleSignInAuthentication? googleAuth =
          await googleUser?.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth?.accessToken,
        idToken: googleAuth?.idToken,
      );

      return await FirebaseAuth.instance.signInWithCredential(credential);
    } catch (e) {
      print(e.toString());
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(child: Lottie.asset("assets/lotties/bird.json")),
            ElevatedButton.icon(
              onPressed: () async {
                UserCredential? user = await signInWithGoogle();

                if (user == null) return;

                // AuthWrapper will automatically handle navigation
                // when FirebaseAuth.instance.authStateChanges() detects the user
              },
              icon: Image.network(
                'https://developers.google.com/identity/images/g-logo.png',
                height: 20,
                width: 20,
              ),
              label: const Text(
                'Sign in with Google',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black87,
                elevation: 2,
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 12,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                  side: BorderSide(color: Colors.grey.shade300),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
