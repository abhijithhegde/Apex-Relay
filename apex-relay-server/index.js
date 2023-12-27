import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/Auth.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server Running!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
