// Entry point for express server to self-host this website
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import basicAuth from "express-basic-auth";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const start = async () => {
  // COMMENTING THE PAYLOAD CMS SERVER
  // function where our server/admin dashboard/cms will start
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use(
    "/admin",
    basicAuth({
      users: { admin: "password" }, // Replace with your credentials
      challenge: true,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
//   app.use((req, res) => nextHandler(req, res));

//   nextApp.prepare().then(() => {
//     // payload.logger.info("Next.js started");

//     app.listen(PORT, async () => {
//       // console.log(`Server running at: http://localhost:${PORT}`);
//       console.log(`Next.js App URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`);
//       // payload.logger.info(
//       //   `Next.js App URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`
//       // );
//     });
//   });
// };

start();
