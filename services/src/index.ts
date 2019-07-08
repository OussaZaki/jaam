/* Enabling Stackdriver Debugger for Node.js */
import * as debugAgent from "@google-cloud/debug-agent";
if (process.env.NODE_ENV === "production") debugAgent.start();


/* App starts here */
import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { refreshToken, auth } from "./services/spotify";

dotenv.config();
const PORT = Number(process.env.PORT) || 8080;
const app = express()

app.use(bodyParser.json())
  .use(cors());

app.get("/ping", (_req: Request, res: Response) => {
  res.send("🎵 Hello Jaam! 🎵")
});

app.post('/auth', auth);
app.get('/refresh_token', refreshToken);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
