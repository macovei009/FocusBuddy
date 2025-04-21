import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { joinWaitingQueue, leaveWaitingQueue } from '../firebase/buddyMatching';

export default function BuddyScreen({ navigation }) {
  const [waiting, setWaiting] = useState(false);
  const [matched, setMatched] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [buddyName, setBuddyName] = useState("");

  const handleJoinQueue = async () => {
    setWaiting(true);
    const result = await joinWaitingQueue();
    
    if (result.success) {
      setMatched(true);
      setBuddyName(result.buddyName);
      setRoomId(result.roomId);

      setTimeout(() => {
        navigation.navigate('Focus', { roomId: result.roomId, buddyName: result.buddyName });
      }, 2000);
    } else {
      alert(result.error);
    }
  };

  const handleLeaveQueue = async () => {
    await leaveWaitingQueue();
    setWaiting(false);
    setMatched(false);
  };

  return (
    <View style={styles.container}>
      {!waiting ? (
        <TouchableOpacity onPress={handleJoinQueue} style={styles.button}>
          <Text style={styles.buttonText}>Find a Buddy</Text>
        </TouchableOpacity>
      ) : (
        <>
          {matched ? (
            <Text style={styles.text}>Matched with {buddyName}!</Text>
          ) : (
            <Text style={styles.text}>Waiting for a buddy...</Text>
          )}
          <ActivityIndicator size="large" color="blue" />
          <TouchableOpacity onPress={handleLeaveQueue} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5 },
  cancelButton: { backgroundColor: '#FF5733', padding: 15, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16 },
});
