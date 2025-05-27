import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type WorkoutType =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "fullBody"
  | "cardio";

const WorkoutScreen = () => {
  const router = useRouter();
  const [workoutType, setWorkoutType] = useState<WorkoutType>("chest");
  const [workoutDetails, setWorkoutDetails] = useState("");

  const handleSubmit = () => {
    // TODO: Save workout data
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.title}>Log Workout</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.pickerContainer}>
            <Text style={styles.inputLabel}>Workout Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={workoutType}
                onValueChange={(value) => setWorkoutType(value)}
                style={styles.picker}
              >
                <Picker.Item label="Chest Day" value="chest" />
                <Picker.Item label="Back Day" value="back" />
                <Picker.Item label="Leg Day" value="legs" />
                <Picker.Item label="Shoulder Day" value="shoulders" />
                <Picker.Item label="Arm Day" value="arms" />
                <Picker.Item label="Full Body" value="fullBody" />
                <Picker.Item label="Cardio" value="cardio" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Workout Details</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              placeholder="What exercises did you do today?"
              value={workoutDetails}
              onChangeText={setWorkoutDetails}
            />
          </View>

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Workout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    padding: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkoutScreen; 