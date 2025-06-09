import 'package:battlepals/views/widgets/multiselect.dart';
import 'package:flutter/material.dart';

class TrackGymPage extends StatefulWidget {
  const TrackGymPage({super.key});

  @override
  State<TrackGymPage> createState() => _TrackGymPageState();
}

class _TrackGymPageState extends State<TrackGymPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Track Gym')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          spacing: 10,
          children: [
            Row(
              children: [
                Expanded(
                  child: MultiSelect(
                    items: [
                      "Chest",
                      "Back",
                      "Legs",
                      "Arms",
                      "Shoulders",
                      "Core",
                    ],
                    title: "Select Muscle Groups",
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: MultiSelect(
                    items: [
                      "Bench Press",
                      "Deadlift",
                      "Squat",
                      "Pull-up",
                      "Push-up",
                      "Lunges",
                    ],
                    title: "Select Exercises",
                  ),
                ),
              ],
            ),
            OutlinedButton(onPressed: () {}, child: Text("Add Workout")),
          ],
        ),
      ),
    );
  }
}
