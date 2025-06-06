import 'package:battlepals/data/notifiers.dart';
import 'package:battlepals/views/pages/home_page.dart';
import 'package:battlepals/views/pages/track_page.dart';
import 'package:battlepals/views/widgets/navbar_widget.dart';
import 'package:flutter/material.dart';

class WidgetTree extends StatefulWidget {
  const WidgetTree({super.key});

  @override
  State<WidgetTree> createState() => _WidgetTreeState();
}

List<Widget> pages = [HomePageWidget(), TrackPageWidget()];

class _WidgetTreeState extends State<WidgetTree> {
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: isDarkModeNotifier,
      builder: (context, isDark, child) => Scaffold(
        appBar: AppBar(
          title: const Text("BattlePals"),
          actions: [
            IconButton(
              icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
              onPressed: () {
                isDarkModeNotifier.value = !isDark;
              },
            ),
          ],
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        ),
        body: ValueListenableBuilder(
          valueListenable: currentPageNotifier,
          builder: (context, currentPage, child) =>
              pages.elementAt(currentPage),
        ),
        bottomNavigationBar: NavbarWidget(),
      ),
    );
  }
}
