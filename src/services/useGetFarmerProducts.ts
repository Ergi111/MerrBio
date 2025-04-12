// import { useState, useEffect } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { toast } from "sonner";
// import { Product } from "../types/product";
// import { db } from "../config/firebase-config";

// export const useFetchFarmerProducts = (farmerId: string) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   console.log("Fetching products for farmerId:", products);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);

//       try {
//         const q = query(
//           collection(db, "products"),
//           where("farmerId", "==", farmerId)
//         );
//         const querySnapshot = await getDocs(q);

//         const productsData: Product[] = [];
//         querySnapshot.forEach((doc) => {
//           productsData.push({ id: doc.id, ...doc.data() } as Product);
//         });

//         setProducts(productsData);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         toast.error("Failed to fetch products. Please try again later.");
//         console.error("Error fetching products: ", err);
//       }
//     };

//     fetchProducts();
//   }, [farmerId]);

//   return { products, loading };
// };
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";
import { Product } from "../types/product";
import { db } from "../config/firebase-config";

export const useFetchFarmerProducts = (farmerId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("Fetching products for farmerId:", farmerId);
  useEffect(() => {
    if (!farmerId) {
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "products"),
      where("farmerId", "==", farmerId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const productsData: Product[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });

        setProducts(productsData);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        toast.error("Failed to fetch products. Please try again later.");
        console.error("Error fetching products: ", err);
      }
    );

    return () => unsubscribe();
  }, [farmerId]);

  return { products, loading };
};
