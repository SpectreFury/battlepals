import 'package:battlepals/views/widgets/multiselect.dart';
import 'package:flutter/material.dart';

class TrackGymPage extends StatefulWidget {
  const TrackGymPage({super.key});

  @override
  State<TrackGymPage> createState() => _TrackGymPageState();
}

class _TrackGymPageState extends State<TrackGymPage> {
  void _showMultiSelect() async {
    final selectedExercises = await showDialog<List<String>>(
      context: context,
      builder: (context) {
        return MultiSelect(
          items: [
            "Bench Press",
            "Squats",
            "Deadlifts",
            "Pull-Ups",
            "Push-Ups",
            "Lunges",
            "Shoulder Press",
          ],
        );
      },
    );

    if (selectedExercises != null) {
      print("Selected Exercises: $selectedExercises");
    }
  }

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
            // Dropdown for selecting exercise
            Text("Select Muscle Group"),
            DropdownMenu(
              onSelected: (value) {
                print("Selected Muscle Group: $value");
              },
              width: double.infinity,
              dropdownMenuEntries: [
                DropdownMenuEntry(label: "Chest", value: "chest"),
                DropdownMenuEntry(label: "Back", value: "back"),
                DropdownMenuEntry(label: "Legs", value: "legs"),
                DropdownMenuEntry(label: "Shoulders", value: "shoulders"),
              ],
            ),
            ElevatedButton(
              onPressed: _showMultiSelect,
              child: Text("Select Exercises"),
            ),
          ],
        ),
      ),
    );
  }
}
