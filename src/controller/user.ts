import { Request, Response } from "express";
import { UserService } from "../services/user";

export const getUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const response = UserService.getUser(id);
		res.status(200).send({ response });
		return;
	} catch (error) {
		res.status(500).send({ Error: (error as any).message || "Server Down" });
		return;
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const response = UserService.getAllUsers();
		res.status(200).send({ response });
		return;
	} catch (error) {
		res.status(500).send({ Error: (error as any).message || "Server Down" });
		return;
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		UserService.deleteUser(id);
		res.status(200).send({ message: "User deleted" });
		return;
	} catch (error) {
		res.status(500).send({ Error: (error as any).message || "Server Down" });
		return;
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { type } = req.body;
		const response = UserService.updateUser(id, type);
		res.status(200).send({ response });
		return;
	} catch (error) {
		res.status(500).send({ Error: (error as any).message || "Server Down" });
		return;
	}
};
