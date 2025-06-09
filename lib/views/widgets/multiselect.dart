import 'package:flutter/material.dart';

class MultiSelect extends StatefulWidget {
  final String title;
  final List<String> items;
  const MultiSelect({super.key, required this.items, required this.title});

  @override
  State<MultiSelect> createState() => _MultiSelectState();
}

class _MultiSelectState extends State<MultiSelect> {
  final List<String> _selectedItems = [];

  void _showMultiSelectDialog() async {
    final result = await showDialog<List<String>>(
      context: context,
      builder: (context) {
        return _MultiSelectDialog(
          items: widget.items,
          initialSelectedItems: List.from(_selectedItems),
        );
      },
    );
    
    if (result != null) {
      setState(() {
        _selectedItems.clear();
        _selectedItems.addAll(result);
      });
    }
  }  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _showMultiSelectDialog,
      child: Text(widget.title),
    );
  }
}

class _MultiSelectDialog extends StatefulWidget {
  final List<String> items;
  final List<String> initialSelectedItems;

  const _MultiSelectDialog({
    required this.items,
    required this.initialSelectedItems,
  });

  @override
  State<_MultiSelectDialog> createState() => _MultiSelectDialogState();
}

class _MultiSelectDialogState extends State<_MultiSelectDialog> {
  late List<String> _selectedItems;

  @override
  void initState() {
    super.initState();
    _selectedItems = List.from(widget.initialSelectedItems);
  }

  void _toggleSelection(String itemValue, bool isSelected) {
    setState(() {
      if (isSelected) {
        _selectedItems.add(itemValue);
      } else {
        _selectedItems.remove(itemValue);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text("Select Items"),
      content: SingleChildScrollView(
        child: ListBody(
          children: widget.items
              .map(
                (item) => CheckboxListTile(
                  value: _selectedItems.contains(item),
                  title: Text(item),
                  controlAffinity: ListTileControlAffinity.leading,
                  onChanged: (isChecked) {
                    if (isChecked != null) {
                      _toggleSelection(item, isChecked);
                    }
                  },
                ),
              )
              .toList(),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text("Cancel"),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pop(context, _selectedItems),
          child: const Text("Submit"),
        ),
      ],
    );
  }
}
