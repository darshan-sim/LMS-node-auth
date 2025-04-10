import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user";
import { successResponse } from "../utils/apiResponse";

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const { message, user } = UserService.getUser(id);
		res.status(200).json(successResponse(message, { user }));
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { message, users } = UserService.getAllUsers();
		res.status(200).json(successResponse(message, { users }));
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const { message } = UserService.deleteUser(id);
		res.status(200).json(successResponse(message, {}));
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const { type } = req.body;
		const { message, user } = UserService.updateUser(id, type);
		res.status(200).json(successResponse(message, { user }));
	} catch (error) {
		next(error);
	}
};
