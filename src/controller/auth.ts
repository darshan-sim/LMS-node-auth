import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { RegisterUserDTO } from "../dtos/user/registerUser";
import { validateDTO } from "../utils/validateDTO";
import { AppError } from "../errors/AppError";
import { successResponse } from "../utils/apiResponse";

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const dto = Object.assign(new RegisterUserDTO(), req.body);
		const errors = validateDTO(dto);
		if (errors.length > 0) {
			throw new AppError("Validation failed", 400, errors);
		}
		const { username, password, type } = dto;
		const {user} = await AuthService.register(username, password, type);
		res
			.status(201)
			.json(successResponse("User registered successfully", {user}));
		return;
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body;
		const {token} = await AuthService.login(
			username,
			password,
			process.env.SECRETE_KEY || "secret-key"
		);
		res.status(201).json(successResponse("User Login successfully", { token }));
		return;
	} catch (error) {
		next(error)
	}
};
