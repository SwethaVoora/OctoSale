import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { OrderCredentialsValidator } from "../lib/validators/orders-validators";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
// import { resend } from "@/lib/resend";

// const createOrderValidator = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string().email(),
//   cartItems: z.array(
//     z.object({
//       product: z.object({
//         id: z.string(),
//         name: z.string(),
//         price: z.number(),
//         category: z.enum(["furniture", "electronics", "free-items"]),
//       }),
//     })
//   ),
// });

// const resend = new Resend(process.env.RESEND_API_KEY);

export const orderRouter = router({
  createPayloadOrder: publicProcedure
    .input(OrderCredentialsValidator)
    .mutation(async ({ input }) => {
      // const { firstname, lastname, email } = input;
      const { firstname, lastname, email, cartitems, phone } = input;
      const payload = await getPayloadClient();

      // resolve: async ({ input }) => {
      //   const { firstName, lastName, email, cartItems } = input;
      try {
        await payload.create({
          collection: "orders",
          data: {
            firstname,
            lastname,
            email,
            phone,
            cartitems,
          },
        });

        // await resend.emails.send({
        //   from: "onboarding@resend.dev",
        //   to: "swetha.voora01@gmail.com",
        //   subject: "Octosale Checkout Form Submission",
        //   text: `First Name: ${firstname}\nLast Name: ${lastname}\nEmail: ${email}\nCart Items: ${cartitems}`,
        // });

        // // Save the order to MongoDB
        // const order = new Order({ firstName, lastName, email, cartItems });
        // await order.save();

        // // Send an email using Resend
        // await resend.sendEmail({
        //   to: email,
        //   subject: "Order Confirmation",
        //   text: `Hello ${firstName},\n\nThank you for your order! Here are the details:\n${JSON.stringify(
        //     cartItems,
        //     null,
        //     2
        //   )}`,
        // });

        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create order : " + error,
          cause: error,
        });
      }
    }),
});
