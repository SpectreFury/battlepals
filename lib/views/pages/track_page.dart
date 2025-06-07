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
        ],
      ),
    );
  }
}
