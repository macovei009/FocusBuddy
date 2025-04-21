import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

export default function StartFocusScreen({ navigation }) {
  const [showQuickModal, setShowQuickModal] = useState(false);

  const startQuickSession = (minutes) => {
    setShowQuickModal(false);
    navigation.navigate("Focus", { solo: true, duration: minutes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How do you want to focus?</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("FocusSetup")}

      >
        <Text style={styles.optionText}>🎧 Focus Alone</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("Buddy")}
      >
        <Text style={styles.optionText}>👥 Focus with a Buddy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quickButton}
        onPress={() => setShowQuickModal(true)}
      >
        <Text style={styles.quickText}>⚡ Quick Session</Text>
      </TouchableOpacity>

      {/* Quick Session Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showQuickModal}
        onRequestClose={() => setShowQuickModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowQuickModal(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Pick a quick session:</Text>
                {[15, 30, 45, 60].map((min) => (
                  <TouchableOpacity
                    key={min}
                    style={styles.modalButton}
                    onPress={() => startQuickSession(min)}
                  >
                    <Text style={styles.modalText}>{min} minutes</Text>
                  </TouchableOpacity>
                ))}

                
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  optionButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  optionText: { fontSize: 18, color: "white" },
  quickButton: {
    backgroundColor: "#f39c12",
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  quickText: { color: "#fff", fontSize: 18 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 10,
  },
});
