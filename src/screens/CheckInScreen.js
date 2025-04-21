import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { saveSession } from '../firebase/firestore';

export default function CheckInScreen({ navigation }) {
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSaveSession = async (completed) => {
    setLoading(true);
    const result = await saveSession(1500, completed, rating);
    setLoading(false);
    if (result.success) {
      navigation.navigate('Home');
    } else {
      alert(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Did you complete your focus session?</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => handleSaveSession(true)} style={styles.button}><Text>Yes</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleSaveSession(false)} style={styles.button}><Text>No</Text></TouchableOpacity>
      </View>

      <Text style={styles.title}>How focused were you? (1-5)</Text>
      <View style={styles.buttonRow}>
        {[1, 2, 3, 4, 5].map(num => (
          <TouchableOpacity key={num} onPress={() => setRating(num)} style={[styles.button, rating === num ? styles.selected : null]}>
            <Text>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <Text>Saving session...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', marginVertical: 10 },
  button: { padding: 10, marginHorizontal: 5, backgroundColor: 'lightgray', borderRadius: 5 },
  selected: { backgroundColor: 'orange' },
});
