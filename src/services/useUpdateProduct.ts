import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../config/firebase-config";

interface EditProductVars {
  productId: string;
  updatedData: {
    productName: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  };
}

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const editProduct = async ({ productId, updatedData }: EditProductVars) => {
    setLoading(true);

    try {
      // Get reference to the product document
      const productRef = doc(db, "products", productId);

      // Update product data in Firestore
      await updateDoc(productRef, {
        ...updatedData,
        updatedAt: new Date(),
      });

      setLoading(false);
      toast.success("Product updated successfully.");
      console.log("Product updated with ID: ", productId);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to update product. Please try again later.");
      console.error("Error updating product: ", err);
    }
  };

  return { editProduct, loading };
};
