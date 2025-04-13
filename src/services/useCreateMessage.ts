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
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export const useCreateMessage = () => {
  const { currentUser } = useAuth();
  const senderId = currentUser?.id as string;
  const [loading, setLoading] = useState(false);
  const sendMessage = async (receiverId: string, text: string) => {
    setLoading(true);
    const conversationId =
      senderId < receiverId
        ? `${senderId}_${receiverId}`
        : `${receiverId}_${senderId}`;

    const conversationRef = doc(db, "conversations", conversationId);
    const conversationSnapshot = await getDoc(conversationRef);

    try {
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
      });
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
