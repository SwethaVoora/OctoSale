import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { Resend } from "resend";

// console.log("RESEND_API_KEY:", process.env.NEXT_PUBLIC_RESEND_API_KEY); // Check if this logs correctly

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const sendEmailSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Must be a valid phone number" })
    .max(14, { message: "Must be a valid phone number" }),
  cartitems: z.string().min(2),
});

export const emailRouter = router({
  sendEmail: publicProcedure
    .input(sendEmailSchema)
    .mutation(async ({ input }) => {
      try {
        const { firstname, lastname, email, cartitems, phone } = input;
        const response = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "swetha.voora01@gmail.com",
          reply_to: email,
          subject: "Octosale Checkout Form Submission",
          text: `Good news! ${firstname} ${lastname} is interested in the buying the below products from OctoSale:\nProducts: ${cartitems}. \n\n To further discuss the process, you may use their contact information\nPhone Number: ${phone}\nEmail: ${email}\nCart Items: ${cartitems}`,
        });

        if (response.error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            // message: response.error,
          });
        }

        return { success: true, message: "Email sent successfully!" };
      } catch (error) {
        console.log(error, "ERRRRRRRR");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email.",
        });
      }
    }),
});
