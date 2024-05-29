import z from "zod";

// Define the product schema for the cart items
// const productSchema = z.object({
//   // id: z.string(),
//   name: z.string(),
//   // description: z.string().nullable().optional(),
//   // OctosalePrice: z.number(),
//   // category: z.enum(["free-items", "furniture", "electronics"]),
// });

// Define the OrderCredentialsValidator schema
export const OrderCredentialsValidator = z.object({
  firstname: z.string().min(1, "First Name is Required"),
  lastname: z.string().min(1, "Last Name is Required"),
  email: z.string().email(),
  phone: z.string().min(10).max(14),
  cartitems: z.string().min(1, "Item names must be comma seperated"),
});

export type TOrderCredentialsValidator = z.infer<
  typeof OrderCredentialsValidator
>;
