import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

//App Config
const PORT = process.env.PORT || 4000;
const app = express();

//Initialize middleware
app.use(express.json());
app.use(cors());
connectDB();

//App routes
app.get("/", (req, res) => {
  res.send("API WORKING.");
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
