import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import path from 'path'
import { fileURLToPath } from 'url';
// /config dot env
dotenv.config();

//database config
connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
///rest obj
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./my-website/build')))
//routes
app.use("/api/v1/auth/", authRoute);

//rest apis

app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./my-website/build/index.html'));
});
//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MOde} mode on port ${PORT}`.bgCyan
      .white
  );
});
