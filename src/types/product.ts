import { IUser } from "./user";

export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  farmerId: string;
  farmerName: string;
  buyer?: IUser;
}
