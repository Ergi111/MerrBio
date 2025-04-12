import { z } from "zod";

//
// ✅ USER SCHEMA
//

export const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["farmer", "consumer"]),
});

export type InsertUser = z.infer<typeof userSchema>;

//
// ✅ PRODUCT SCHEMA
//
export const productSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  unit: z.string().min(1),
  category: z.string().min(1),
  inStock: z.boolean(),
  farmerId: z.number().int(),
  farmerName: z.string().min(1),
});

export type InsertProduct = z.infer<typeof productSchema>;

//
// ✅ PURCHASE REQUEST SCHEMA
//
export const purchaseRequestSchema = z.object({
  productId: z.number().int(),
  consumerId: z.number().int(),
  farmerId: z.number().int(),
  quantity: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid quantity format"),
  message: z.string().optional(),
  status: z.enum(["pending", "accepted", "rejected"]).default("pending"),
  deliveryMethod: z.string().min(1),
});

export type InsertPurchaseRequest = z.infer<typeof purchaseRequestSchema>;

//
// ✅ MESSAGE SCHEMA
//
export const messageSchema = z.object({
  senderId: z.number().int(),
  receiverId: z.number().int(),
  content: z.string().min(1),
  requestId: z.number().int().optional(),
});

export type InsertMessage = z.infer<typeof messageSchema>;
