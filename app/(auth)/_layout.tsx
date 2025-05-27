import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AuthLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={28}
              color={focused ? "#000" : "#7a7a7a"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="people"
              size={28}
              color={focused ? "#000" : "#7a7a7a"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
