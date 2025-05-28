import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFirestore, collection, getDocs, query, where, addDoc } from '@react-native-firebase/firestore';
import { getAuth } from "@react-native-firebase/auth";

type WorkoutType =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "fullBody"
  | "cardio";

type Group = {
  id: string;
  name: string;
  description: string;
  author: string;
  members: string[];
  createdAt: Date;
};

const workoutTypesToDisplay = [
  {
    label: "Chest Day",
    value: "chest",
  },
  {
    label: "Back Day",
    value: "back",
  },
  {
    label: "Leg Day",
    value: "legs",
  },
  {
    label: "Shoulder Day",
    value: "shoulders",
  },
  {
    label: "Arm Day",
    value: "arms",
  },
  {
    label: "Full Body",
    value: "fullBody",
  },
  {
    label: "Cardio",
    value: "cardio",
  }
]

const WorkoutScreen = () => {
  const router = useRouter();
  const [workoutType, setWorkoutType] = useState<WorkoutType>("chest");
  const [workoutDetails, setWorkoutDetails] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const groupRef = collection(db, 'groups');
        const q = query(groupRef, where('members', 'array-contains', auth.currentUser?.uid));
        const snapshot = await getDocs(q);

        const userGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Group[];


        setGroups(userGroups);
        if (userGroups.length > 0) {
          setSelectedGroup(userGroups[0].id);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async () => {
    // TODO: Save workout data with selected group
    setLoading(true);

    try {
      const workoutRef = collection(db, 'workouts');

      const workoutDoc = await addDoc(workoutRef, {
        groupId: selectedGroup,
        workoutType: workoutTypesToDisplay.find(type => type.value === workoutType)?.label || workoutType,
        workoutDetails: workoutDetails,
        createdAt: new Date(),
        author: auth.currentUser?.uid,
      })
    }
    catch (e) {
      console.error('Error saving workout:', e);
    }
    finally {
      setLoading(false);
    }


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

          <View style={styles.pickerContainer}>
            <Text style={styles.inputLabel}>Share with Group</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedGroup}
                onValueChange={(value) => setSelectedGroup(value)}
                style={styles.picker}
                enabled={groups.length > 0}
              >
                {groups.map((group) => (
                  <Picker.Item key={group.id} label={group.name} value={group.id} />
                ))}
                {groups.length === 0 && (
                  <Picker.Item label="No groups available" value="" />
                )}
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

          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <Pressable
              style={[styles.submitButton, (!selectedGroup || loading) && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!selectedGroup || loading}
            >
              <Text style={styles.submitButtonText}>Save Workout</Text>
            </Pressable>
          )}
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
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkoutScreen; 