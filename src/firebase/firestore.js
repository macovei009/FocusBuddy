import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Save session data
export const saveSession = async (duration, completed, rating) => {
  if (!auth.currentUser) return { success: false, error: "User not logged in" };

  try {
    await addDoc(collection(db, "sessions"), {
      userId: auth.currentUser.uid,
      duration: duration,
      completed: completed,
      rating: rating,
      timestamp: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all sessions for the current user
export const getUserSessions = async () => {
    if (!auth.currentUser) return { success: false, error: "User not logged in" };
  
    try {
      const q = query(collection(db, "sessions"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const sessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: sessions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
