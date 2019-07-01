/* Enabling Stackdriver Debugger for Node.js */
import * as debugAgent from "@google-cloud/debug-agent";
if (process.env.NODE_ENV === "production") debugAgent.start();


/* App starts here */
import express, { Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { login, callback, refreshToken } from "./spotify";

dotenv.config();
const PORT = Number(process.env.PORT) || 8080;
const app = express()

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get("/ping", (_req: Request, res: Response) => {
  res.send("🎵 Hello Jaam! 🎵")
});

app.get('/login', login);
app.get('/callback', callback);
app.get('/refresh_token', refreshToken);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
