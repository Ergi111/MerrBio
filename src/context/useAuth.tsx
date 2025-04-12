import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import { IUser } from "../types/user";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { routerPaths } from "../constants/routerPaths";

// Define the shape of our Auth context
interface AuthContextType {
  currentUser: IUser | null;
  userLoading: boolean;
  signIn: (email: string, password: string) => Promise<IUser>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isSignedInLoading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userLoading: true,
  signIn: async () => {
    throw new Error("signIn function not implemented");
  },
  signOut: async () => {
    throw new Error("logout function not implemented");
  },
  isAuthenticated: false,
  isSignedInLoading: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate();
  const [isSignedInLoading, setIsSignedInLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<IUser | null> => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as IUser;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("User not found");
      return null;
    }
  };

  const signIn = async (email: string, password: string): Promise<IUser> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsSignedInLoading(true);
      const userData = await fetchUserData(userCredential.user.uid);
      if (!userData) {
        toast.error("User not found");
        throw new Error("User not found");
      }
      return userData;
    } catch (error: any) {
      setIsSignedInLoading(false);
      console.error("Sign in error:", error.message);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      navigate(routerPaths.signIn);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUserLoading(true);
      if (user) {
        const userData = await fetchUserData(user.uid);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
        navigate(routerPaths.signIn);
      }
      setUserLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [navigate]);

  const value: AuthContextType = {
    currentUser,
    userLoading,
    isSignedInLoading,
    signIn,
    signOut,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
