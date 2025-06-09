import 'package:flutter/material.dart';

class TrackDietPage extends StatefulWidget {
  const TrackDietPage({super.key});

  @override
  State<TrackDietPage> createState() => _TrackDietPageState();
}

class _TrackDietPageState extends State<TrackDietPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Track Diet')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Track your diet here!'),
            ElevatedButton(
              onPressed: () {
                // Add your tracking logic here
              },
              child: const Text('Add Meal'),
            ),
          ],
        ),
      ),
    );
  }
}
