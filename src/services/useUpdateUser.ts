import { useState } from "react";
import { UserRoleEnum } from "../types/User";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

interface UpdateUsersVars {
  id: string;
  role?: UserRoleEnum;
}
export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (data: UpdateUsersVars) => {
    const userRef = doc(db, "users", data.id);
    try {
      await updateDoc(userRef, {
        data,
      });
    } catch (err: any) {
      console.error("Update user error:", err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
