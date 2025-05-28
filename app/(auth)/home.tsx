import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Activity from "../components/Activity";
import { getFirestore, collection, query, where, orderBy, limit, getDocs, getDoc, doc, onSnapshot } from '@react-native-firebase/firestore';
import { useState, useEffect } from "react";

interface ActivityData {
  id: string;
  workoutType: string;
  groupName: string;
  date: string;
  user: {
    name: string;
    photoURL?: string;
  };
}

interface WorkoutData {
  workoutType: string;
  groupId?: string;
  createdAt: {
    toDate: () => Date;
  };
}

interface GroupData {
  name: string;
}

const AuthIndex = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupsCount, setGroupsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        
        // Fetch user's groups
        const groupsRef = collection(db, 'groups');
        const groupsQuery = query(groupsRef, where('members', 'array-contains', user?.uid));
        const groupsSnapshot = await getDocs(groupsQuery);
        setGroupsCount(groupsSnapshot.size);

        // Set up real-time listener for activities
        const activitiesRef = collection(db, 'workouts');
        const q = query(
          activitiesRef,
          where('author', '==', user?.uid),
          orderBy('createdAt', 'desc'),
          limit(10)
        );

        // Replace getDocs with onSnapshot
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const activitiesList = await Promise.all(snapshot.docs.map(async workoutDoc => {
            const data = workoutDoc.data() as WorkoutData;
            let groupName = 'Personal';

            if (data.groupId) {
              const groupRef = doc(db, 'groups', data.groupId);
              const groupDoc = await getDoc(groupRef);
              if (groupDoc.exists()) {
                const groupData = groupDoc.data() as GroupData;
                groupName = groupData.name;
              }
            }

            return {
              id: workoutDoc.id,
              workoutType: data.workoutType,
              groupName: groupName,
              date: data.createdAt.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              user: {
                name: user?.displayName || 'User',
                photoURL: user?.photoURL || undefined
              }
            };
          }));

          setActivities(activitiesList);
          setLoading(false);
        });

        // Cleanup function to remove the listener when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const dummyActivities = [
    {
      id: 1,
      title: "Morning Run",
      workoutType: "Cardio",
      groupName: "Running Club",
      date: "March 15, 2024",
      user: {
        name: "John Doe",
        photoURL: "https://i.pravatar.cc/150?img=1"
      }
    },
    {
      id: 2,
      title: "Weight Training",
      workoutType: "Strength",
      groupName: "Gym Buddies",
      date: "March 14, 2024",
      user: {
        name: "Sarah Smith",
        photoURL: "https://i.pravatar.cc/150?img=2"
      }
    },
    {
      id: 3,
      title: "Yoga Session",
      workoutType: "Flexibility",
      groupName: "Yoga Enthusiasts",
      date: "March 13, 2024",
      user: {
        name: "Mike Johnson",
        photoURL: "https://i.pravatar.cc/150?img=3"
      }
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#7a7a7a" />
          </Pressable>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={40} color="#7a7a7a" />
                </View>
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.displayName || "User"}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{groupsCount}</Text>
              <Text style={styles.statLabel}>Groups</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Link href="/(auth)/workout" style={styles.actionLink}>
            <View style={styles.actionButton}>
              <Ionicons name="fitness-outline" size={24} color="#333" />
              <Text style={styles.actionButtonText}>Log Today's Workout</Text>
            </View>
          </Link>
        </View>

        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            activities.map((activity) => (
              <Activity
                key={activity.id}
                workoutType={activity.workoutType}
                groupName={activity.groupName}
                date={activity.date}
                user={activity.user}
                onPress={() => {
                  // Handle activity press
                  console.log("Activity pressed:", activity.id);
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
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
  profileCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
  },
  signOutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#7a7a7a",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7a7a7a",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
  },
  actionsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  actionLink: {
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
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
    width: '100%',
  },
  actionButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  activitiesContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
});

export default AuthIndex;
