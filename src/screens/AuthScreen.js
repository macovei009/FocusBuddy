import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signUp, signIn, logout } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Set default as null to avoid the undefined issue

  useEffect(() => {
    // This listens for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  const handleSignUp = async () => {
    const result = await signUp(email, password);
    if (!result.success) alert(result.error);
  };

  const handleSignIn = async () => {
    const result = await signIn(email, password);
    if (!result.success) alert(result.error);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) setUser(null);
    else alert(result.error);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Welcome, {user.email}!</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
          
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { width: '100%', padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
  button: { backgroundColor: '#f39c12', padding: 12, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});
