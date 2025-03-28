import { Request, Response } from "express";
import { AuthService } from "../services/auth";
import { RegisterUserDTO } from "../dtos/user/registerUser";
import { validateDTO } from "../utils/validateDTO";

export const registerUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const dto = Object.assign(new RegisterUserDTO(), req.body);
		const errors = validateDTO(dto);
		if (errors.length > 0) {
			res.status(400).json({ message: "Validation failed", errors });
			return;
		}
		const { username, password, type } = dto;
		const response = await AuthService.register(username, password, type);
		res.status(201).send(response);
		return;
	} catch (error) {
		res.status(500).send({
			message: `Error while registering user ${(error as any).message}`
		});
		return;
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const response = await AuthService.login(
			username,
			password,
			process.env.SECRETE_KEY || "secret-key"
		);
		res.status(201).send(response);
		return;
	} catch (error) {
		res
			.status(500)
			.send({ message: `Error while login ${(error as any).message}` });
		return;
	}
};
