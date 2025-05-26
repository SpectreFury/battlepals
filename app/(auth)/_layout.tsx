import { Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  );
};

export default AuthLayout;
