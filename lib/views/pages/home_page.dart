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
    return Padding(
      padding: EdgeInsets.only(left: 16.0, right: 16.0),
      child: Column(
        children: [
          SizedBox(height: 50),
          Container(
            child: Column(
              children: [
                Text(
                  "Good Morning, ${_auth.currentUser?.displayName}",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          Divider(),
          Expanded(
            child: ListView(
              children: [
                ListTile(
                  title: Text("Back Day"),
                  subtitle: Text("Deadlifts, Pull-ups, Rows"),
                  trailing: CircleAvatar(
                    backgroundColor: Colors.blue,
                    backgroundImage: _auth.currentUser?.photoURL != null
                        ? NetworkImage(_auth.currentUser!.photoURL!)
                        : null,
                    child: _auth.currentUser?.photoURL == null
                        ? Icon(Icons.person)
                        : null,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
