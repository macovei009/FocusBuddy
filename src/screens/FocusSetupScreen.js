import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";

  

export default function FocusSetupScreen({ navigation }) {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionCount, setSessionCount] = useState(2);
  const [customMinutes, setCustomMinutes] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const handleStart = () => {
    const duration = useCustom ? parseInt(customMinutes) : focusDuration;

    if (!duration || duration <= 0) {
      Alert.alert("Invalid duration", "Please enter a valid custom time.");
      return;
    }

    navigation.navigate("Focus", {
      solo: true,
      duration,
      breakDuration,
      sessionCount,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        {/* Back button */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={28} color="gray" />
    </TouchableOpacity>

      <Text style={styles.title}>Set Your Focus Session</Text>

      {/* Focus Duration */}
      <Text style={styles.label}>Focus Time (minutes)</Text>
      <View style={styles.optionRow}>
        {[15, 30, 45, 60].map((min) => (
          <TouchableOpacity
            key={min}
            style={[
              styles.optionButton,
              focusDuration === min && !useCustom && styles.active,
            ]}
            onPress={() => {
              setFocusDuration(min);
              setUseCustom(false);
            }}
          >
            <Text style={styles.optionText}>{min}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.optionButton, useCustom && styles.active]}
          onPress={() => setUseCustom(true)}
        >
          <Text style={styles.optionText}>Custom</Text>
        </TouchableOpacity>
      </View>

      {useCustom && (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter custom minutes"
          value={customMinutes}
          onChangeText={setCustomMinutes}
        />
      )}

      {/* Break Duration */}
      <Text style={styles.label}>Break Time (minutes)</Text>
      <View style={styles.optionRow}>
        {[3, 5, 10].map((min) => (
          <TouchableOpacity
            key={min}
            style={[
              styles.optionButton,
              breakDuration === min && styles.active,
            ]}
            onPress={() => setBreakDuration(min)}
          >
            <Text style={styles.optionText}>{min}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Session Count */}
      <Text style={styles.label}>Number of Sessions</Text>
      <View style={styles.optionRow}>
        {[2, 3, 4].map((count) => (
          <TouchableOpacity
            key={count}
            style={[
              styles.optionButton,
              sessionCount === count && styles.active,
            ]}
            onPress={() => setSessionCount(count)}
          >
            <Text style={styles.optionText}>{count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startText}>Start Session</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, marginTop: 20, marginBottom: 10 },
  optionRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  optionButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ccc",
    margin: 5,
    minWidth: 60,
    alignItems: "center",
  },
  optionText: { fontSize: 16 },
  active: { backgroundColor: "#4CAF50" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    width: 150,
  },
  startButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginTop: 40,
    alignItems: "center",
  },
  startText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  
});
