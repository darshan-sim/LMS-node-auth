import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import dotenv from "dotenv";

dotenv.config();

export const registerUser =  async (req: Request, res: Response) => {
    try {
        const { username, password, type } = req.body;
        const response = await AuthService.register(username, password, type);
        res.status(201).send(response);
    } catch (error) {
        res
            .status(500)
            .send({ message: `Error while registering user ${(error as any).message}` });
    }
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const response = await AuthService.login(
			username,
			password,
			process.env.SECRETE_KEY!
		);
		res.status(201).send(response);
	} catch (error) {
		res
			.status(500)
			.send({ message: `Error while login ${(error as any).message}` });
	}
};