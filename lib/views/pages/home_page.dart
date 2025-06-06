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
        children: [const Text("Home Page Widget")],
      ),
    );
  }
}
