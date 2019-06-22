/* Enabling Stackdriver Debugger for Node.js */
import * as debugAgent from "@google-cloud/debug-agent";
if (process.env.NODE_ENV === "production") debugAgent.start();


/* App starts here */
import express, { Response, Request } from "express";


const PORT = Number(process.env.PORT) || 8080;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("🎵 Hello Jaam! 🎵")
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
