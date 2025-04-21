import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, setDoc } from 'firebase/firestore';

// List of random names for bots
const botNames = [
  "Alex", "Jordan", "Sam", "Taylor", "Chris", "Morgan", "Jamie", "Cameron",
  "Drew", "Riley", "Casey", "Quinn", "Skyler", "Reese", "Devin"
];

// Function to get a random name
const getRandomBotName = () => botNames[Math.floor(Math.random() * botNames.length)];

// Function to add user to the waiting queue or match them with a buddy/bot
export const joinWaitingQueue = async () => {
  if (!auth.currentUser) return { success: false, error: "User not logged in" };

  try {
    // Check if there's another user waiting
    const q = query(collection(db, "waitingQueue"));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Pair with the first user in the queue
      const waitingUser = querySnapshot.docs[0];
      const buddyId = waitingUser.data().userId;

      // Create a focus room for both users
      const roomId = `${auth.currentUser.uid}_${buddyId}`;
      await setDoc(doc(db, "focusRooms", roomId), {
        users: [auth.currentUser.uid, buddyId],
        createdAt: new Date(),
      });

      // Remove the waiting user from the queue
      await deleteDoc(doc(db, "waitingQueue", waitingUser.id));

      return { success: true, roomId, matched: true, buddyName: waitingUser.data().name };
    } else {
      // No real users available - create a bot with a random name
      const botId = `bot_${Math.floor(Math.random() * 1000)}`;
      const botName = getRandomBotName();
      const roomId = `${auth.currentUser.uid}_${botId}`;

      await setDoc(doc(db, "focusRooms", roomId), {
        users: [auth.currentUser.uid, botId],
        createdAt: new Date(),
        buddyName: botName, // Assign the random bot name
      });

      return { success: true, roomId, matched: true, buddyName: botName };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
