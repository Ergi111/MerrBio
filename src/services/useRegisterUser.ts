import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import { UserRoleEnum } from "../types/user";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRoleEnum
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        role,
        fullName,
      });

      return user;
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};
