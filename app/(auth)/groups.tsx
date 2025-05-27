import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Mock data for groups
const mockGroups = [
  {
    id: "1",
    name: "Fitness Warriors",
    members: 12,
    description: "A group focused on strength training and cardio",
  },
  {
    id: "2",
    name: "Morning Runners",
    members: 8,
    description: "Early morning running group",
  },
  {
    id: "3",
    name: "Yoga Enthusiasts",
    members: 15,
    description: "Daily yoga practice and meditation",
  },
];

const GroupsPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const handleCreateGroup = () => {
    // TODO: Implement group creation
    setIsCreating(false);
    setGroupName("");
    setGroupDescription("");
  };

  const handleJoinGroup = () => {
    // TODO: Implement group joining
    setIsJoining(false);
    setGroupCode("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.title}>Groups</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {!isCreating && !isJoining ? (
            <>
              <View style={styles.actionsContainer}>
                <Pressable
                  style={[styles.actionButton, styles.actionButtonLeft]}
                  onPress={() => setIsCreating(true)}
                >
                  <Ionicons name="add-circle-outline" size={24} color="#333" />
                  <Text style={styles.actionButtonText}>Create Group</Text>
                </Pressable>

                <Pressable
                  style={[styles.actionButton, styles.actionButtonRight]}
                  onPress={() => setIsJoining(true)}
                >
                  <Ionicons name="people-outline" size={24} color="#333" />
                  <Text style={styles.actionButtonText}>Join Group</Text>
                </Pressable>
              </View>

              <View style={styles.groupsSection}>
                <Text style={styles.sectionTitle}>My Groups</Text>
                {mockGroups.map((group) => (
                  <View key={group.id} style={styles.groupCard}>
                    <View style={styles.groupHeader}>
                      <Text style={styles.groupName}>{group.name}</Text>
                      <View style={styles.memberCount}>
                        <Ionicons name="people" size={16} color="#666" />
                        <Text style={styles.memberCountText}>{group.members}</Text>
                      </View>
                    </View>
                    <Text style={styles.groupDescription}>{group.description}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : isCreating ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Group Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter group name"
                  placeholderTextColor="#999"
                  value={groupName}
                  onChangeText={setGroupName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe your group"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={groupDescription}
                  onChangeText={setGroupDescription}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsCreating(false);
                    setGroupName("");
                    setGroupDescription("");
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.submitButton]}
                  onPress={handleCreateGroup}
                >
                  <Text style={styles.submitButtonText}>Create Group</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Group Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter group code"
                  placeholderTextColor="#999"
                  autoCapitalize="characters"
                  value={groupCode}
                  onChangeText={setGroupCode}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsJoining(false);
                    setGroupCode("");
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.submitButton]}
                  onPress={handleJoinGroup}
                >
                  <Text style={styles.submitButtonText}>Join Group</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
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
  scrollView: {
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonLeft: {
    marginRight: 8,
  },
  actionButtonRight: {
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  groupsSection: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  groupCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  memberCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberCountText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 14,
  },
  groupDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textArea: {
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GroupsPage;
