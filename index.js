import express from "express";
import v1Router from "./routes/index.js";
import { dbConnect } from "./db/database.js";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
dotenv.config();

const PORT=process.env.PORT






const app=express()
// Middlewares
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(logger("dev"));
app.use(express.json());
dbConnect()
app.use("/api/v1", v1Router);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})