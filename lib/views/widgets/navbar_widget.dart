import 'package:battlepals/data/notifiers.dart';
import 'package:flutter/material.dart';

class NavbarWidget extends StatefulWidget {
  @override
  State<NavbarWidget> createState() => _NavbarWidgetState();
}

class _NavbarWidgetState extends State<NavbarWidget> {
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: currentPageNotifier,
      builder: (context, currentPage, child) => NavigationBar(
        destinations: [
          NavigationDestination(icon: Icon(Icons.home), label: "Home"),
          NavigationDestination(icon: Icon(Icons.settings), label: "Settings"),
        ],
        selectedIndex: currentPage,
        onDestinationSelected: (int index) {
          currentPageNotifier.value = index;
        },
      ),
    );
  }
}
