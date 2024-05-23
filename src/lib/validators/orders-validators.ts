import z from "zod";

// Define the product schema for the cart items
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  OctosalePrice: z.number(),
  category: z.enum(["free-items", "furniture", "electronics"]),
});

// Define the OrderCredentialsValidator schema
export const OrderCredentialsValidator = z.object({
  firstname: z.string().min(1, "First Name is Required"),
  lastname: z.string().min(1, "Last Name is Required"),
  email: z.string().email(),
  cartitems: z.array(productSchema),
});

export type TOrderCredentialsValidator = z.infer<
  typeof OrderCredentialsValidator
>;
