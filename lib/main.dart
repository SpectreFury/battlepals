import 'package:battlepals/views/pages/home_page.dart';
import 'package:battlepals/views/pages/track_page.dart';
import 'package:battlepals/views/widget_tree.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

List<Widget> pages = [HomePageWidget(), TrackPageWidget()];

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: WidgetTree(),
    );
  }
}
