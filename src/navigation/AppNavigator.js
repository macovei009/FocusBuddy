import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import StartFocusScreen from "../screens/StartFocusScreen";
import FocusScreen from "../screens/FocusScreen";
import BuddyScreen from "../screens/BuddyScreen";
import CheckInScreen from "../screens/CheckInScreen";
import StatsScreen from "../screens/StatsScreen";
import AuthScreen from "../screens/AuthScreen";
import FocusSetupScreen from "../screens/FocusSetupScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigation (Main App)
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StartFocus"
        component={StartFocusScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={size} color={color} />
          ),
          title: "Focus",
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation (Authentication + App Flow)
export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Prevents flickering while checking auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Focus" component={FocusScreen} />
            <Stack.Screen name="Buddy" component={BuddyScreen} />
            <Stack.Screen name="CheckIn" component={CheckInScreen} />
            <Stack.Screen name="FocusSetup" component={FocusSetupScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
