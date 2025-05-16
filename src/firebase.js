import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, push, onChildAdded } from "firebase/database";
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Example: Send a message
export function sendMessage(text, user) {
  push(dbRef(db, "messages/"), {
    text,
    user,
    timestamp: Date.now()
  });
}

import { ref, onMounted } from "vue";
const messages = ref([]);
onMounted(() => {
  onChildAdded(dbRef(db, "messages/"), (snapshot) => {
    messages.value.push(snapshot.val());
  });
});