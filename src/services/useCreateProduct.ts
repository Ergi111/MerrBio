import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "sonner";

interface CreateProductVars {
  productName: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  farmerId: string;
  farmerName: string;
}

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const db = getFirestore();

  const createProduct = async (productData: CreateProductVars) => {
    // if (!user) {
    //   setError("You must be logged in to add a product.");
    //   return;
    // }

    // No need to check if the user is a farmer since it's handled elsewhere
    // if (user.role !== "FARMER") {
    //   setError("You do not have permission to add products.");
    //   return;
    // }

    setLoading(true);

    try {
      // Add product to Firestore
      const productRef = await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      setSuccess(true);
      setLoading(false);
      console.log("Product created with ID: ", productRef.id);
    } catch (err) {
      toast.error("Failed to create product. Please try again later.");
      setLoading(false);
      setError("Failed to create product. Please try again later.");
      console.error("Error adding product: ", err);
    }
  };

  return { createProduct, loading, error, success };
};
