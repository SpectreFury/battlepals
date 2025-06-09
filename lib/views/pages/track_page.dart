import 'package:battlepals/views/pages/track_diet_page.dart';
import 'package:battlepals/views/pages/track_gym_page.dart';
import 'package:flutter/material.dart';

class TrackPageWidget extends StatelessWidget {
  TrackPageWidget({super.key});

  final TextEditingController _controller = TextEditingController();
  final DateTime currentDate = DateTime.now();
  final List<String> daysOfWeek = const [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  String _getDaySuffix(int day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  String _monthName(int month) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1];
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 50),
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  daysOfWeek[currentDate.weekday - 1],
                  style: TextStyle(fontSize: 24),
                ),
                Text(
                  "${currentDate.day}${_getDaySuffix(currentDate.day)}, ${_monthName(currentDate.month)}",
                  style: TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),
          Divider(),
          SizedBox(height: 10),
          InkWell(
            onTap: () {
              // Handle the tap event
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => TrackGymPage()),
              );
            },
            child: Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Row(
                children: [
                  Icon(Icons.fitness_center),
                  SizedBox(width: 8.0),
                  Text("Track Gym"),
                ],
              ),
            ),
          ),
          InkWell(
            onTap: () {
              // Handle the tap event
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => TrackDietPage()),
              );
            },
            child: Container(
              padding: EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: Row(
                children: [
                  Icon(Icons.food_bank),
                  SizedBox(width: 8.0),
                  Text("Track Diet"),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
