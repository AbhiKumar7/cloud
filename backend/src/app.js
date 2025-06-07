import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import baseAuthUser from "./router/user.route.js";
import baseMedia from "./router/media.route.js";
import baseAlbum from "./router/album.router.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs";    
dotenv.config({ path: ".env" });

const app = express();
const uploadDir = path.join(process.cwd(), 'backend/public/temp');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
}
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", baseAuthUser);
app.use("/api/media", baseMedia);
app.use("/api/album", baseAlbum);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  express.static(path.join(__dirname, "../../frontend/imagestorage/dist"))
);
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/imagestorage/dist/index.html"));
});
export { app };
