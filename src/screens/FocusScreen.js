import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

export default function FocusScreen({ route, navigation }) {
  const {
    solo = false,
    buddyName = "Your Focus Buddy",
    duration = 25,
    breakDuration = 5,
    sessionCount = 2,
  } = route.params || {};

  const [seconds, setSeconds] = useState(duration * 60);
  const [running, setRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(1);
  const [onBreak, setOnBreak] = useState(false);
  const tickSound = useRef(null);
  const intervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Load tick sound
  useEffect(() => {
    const loadSound = async () => {
      tickSound.current = new Audio.Sound();
      await tickSound.current.loadAsync(require("../assets/sounds/tick.mp3"));
    };
    loadSound();

    return () => {
      tickSound.current?.unloadAsync();
    };
  }, []);

  const playTickSound = async () => {
    if (tickSound.current) {
      try {
        await tickSound.current.replayAsync();
      } catch (err) {
        console.log("Tick sound error:", err);
      }
    }
  };

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.setValue(1);
    pulseAnim.stopAnimation();
  };

  const startTimer = (durationInSeconds) => {
    clearInterval(intervalRef.current);
    setSeconds(durationInSeconds);

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          handleTransition();
          return 0;
        }

        if (prev === 11) {
          playTickSound();
          startPulse();
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleTransition = () => {
    stopPulse();
    if (onBreak) {
      if (currentSession < sessionCount) {
        setCurrentSession((prev) => prev + 1);
        setOnBreak(false);
        startTimer(duration * 60);
      } else {
        Alert.alert("All sessions complete", "Nice work! 🎉");
        resetAll();
      }
    } else {
      setOnBreak(true);
      startTimer(breakDuration * 60);
    }
  };

  const resetAll = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setOnBreak(false);
    setCurrentSession(1);
    setSeconds(duration * 60);
    stopPulse();
  };

  const handleStart = () => {
    setRunning(true);
    startTimer(seconds);
  };

  const handlePause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    stopPulse();
  };

  const isFinal10 = seconds <= 10;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="gray" />
      </TouchableOpacity>

      {/* Animated Timer */}
      <Animated.Text
        style={[
          styles.timer,
          isFinal10 && { transform: [{ scale: pulseAnim }], color: "red" },
        ]}
      >
        {`${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`}
      </Animated.Text>

      {/* Session Info */}
      <Text style={styles.text}>
        {onBreak
          ? `Break ${currentSession}/${sessionCount}`
          : solo
          ? `Focus Session ${currentSession}/${sessionCount}`
          : `Focusing with ${buddyName}`}
      </Text>

      {/* Control Buttons */}
      <View style={styles.buttons}>
        {!running ? (
          <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePause} style={styles.button}>
            <Text>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetAll} style={styles.button}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  timer: { fontSize: 48 },
  text: { fontSize: 18, marginBottom: 20 },
  buttons: { flexDirection: "row", marginTop: 20 },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
