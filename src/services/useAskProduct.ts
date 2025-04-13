import { useState } from "react";
import { toast } from "sonner";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/useAuth";
import { db } from "../config/firebase-config";

export const useAskProduct = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buyProduct = async (productId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Ensure that the currentUser object contains the uid or a similar identifier
      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        buyer: currentUser,
      });

      toast.success("Product marked as bought!");
    } catch (err: any) {
      setError("Error buying the product. Please try again.");
      console.error("Error updating product:", err);
      toast.error("Error buying the product.");
    } finally {
      setLoading(false);
    }
  };

  return {
    buyProduct,
    loading,
    error,
  };
};
