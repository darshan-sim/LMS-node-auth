import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/", (req:Request, res: Response)=> {
    res.status(200).send("Server Running")
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${process.env.PORT || 3000}`);
});