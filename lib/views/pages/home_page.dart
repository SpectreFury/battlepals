import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';

class HomePageWidget extends StatefulWidget {
  HomePageWidget({super.key});

  @override
  State<HomePageWidget> createState() => _HomePageWidgetState();
}

class _HomePageWidgetState extends State<HomePageWidget> {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text("Home Page Widget"),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () async {
              await _auth.signOut();
              // AuthWrapper will automatically redirect to login page
            },
            child: const Text("Sign Out"),
          ),
        ],
      ),
    );
  }
}
