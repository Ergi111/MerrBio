import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useCreateMessage = () => {
  const sendMessage = async (
    senderId: string,
    receiverId: string,
    text: string
  ) => {
    const conversationId =
      senderId < receiverId
        ? `${senderId}_${receiverId}`
        : `${receiverId}_${senderId}`;

    const conversationRef = doc(db, "conversations", conversationId);
    const conversationSnapshot = await getDoc(conversationRef);

    if (!conversationSnapshot.exists()) {
      await setDoc(conversationRef, {
        participants: [senderId, receiverId],
        lastMessage: text,
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(conversationRef, {
        lastMessage: text,
        updatedAt: serverTimestamp(),
      });
    }

    const messagesRef = collection(conversationRef, "messages");
    await addDoc(messagesRef, {
      senderId,
      text,
      createdAt: serverTimestamp(),
      read: false,
    });
  };

  return { sendMessage };
};
