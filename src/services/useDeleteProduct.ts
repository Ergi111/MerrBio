import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { db } from "../config/firebase-config";

interface DeleteProductVars {
  productId: string;
}

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);

  const deleteProduct = async ({ productId }: DeleteProductVars) => {
    setLoading(true);

    try {
      // Get reference to the product document
      const productRef = doc(db, "products", productId);

      // Delete product from Firestore
      await deleteDoc(productRef);

      setLoading(false);
      toast.success("Product deleted successfully.");
      console.log("Product deleted with ID: ", productId);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to delete product. Please try again later.");
      console.error("Error deleting product: ", err);
    }
  };

  return { deleteProduct, loading };
};
