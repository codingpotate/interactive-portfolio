import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"; 
dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes); 

app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
