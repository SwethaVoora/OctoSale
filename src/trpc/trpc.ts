import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create();
export const router = t.router;
export const publicProcedure = t.procedure; //Anyone will be able to call this endpoint
