import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const clientID = process.env.GOOGLE_CLIENT_ID;

const clientSecret = process.env.GOOGLE_CLIENT_SECRET;


export const oauth2Client = new google.auth.OAuth2(
  clientID,
  clientSecret,
  process.env.GOOGLE_URL
);
