import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { IUser } from "../types/user";

export const useGetUsers = (currentUserId: string) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: IUser[] = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data() as IUser;
          if (userData.id !== currentUserId) {
            usersList.push(userData);
          }
        });

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return { users, loading, error };
};
