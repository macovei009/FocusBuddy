import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getUserSessions } from '../firebase/firestore';

export default function StatsScreen() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      const result = await getUserSessions();
      if (result.success) {
        setSessions(result.data);
      } else {
        alert(result.error);
      }
      setLoading(false);
    }
    fetchSessions();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Loading sessions...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session History</Text>
      {sessions.length === 0 ? (
        <Text>No focus sessions recorded yet.</Text>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.sessionCard}>
              <Text>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</Text>
              <Text>Completed: {item.completed ? "✅ Yes" : "❌ No"}</Text>
              <Text>Focus Rating: {item.rating}/5</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  loading: { fontSize: 18, textAlign: "center", marginTop: 20 },
  sessionCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
