import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
const jwt = require("jsonwebtoken");

export const verifyJWT = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		const error = new AppError("Unauthorized", 401, [
			{
				code: "AUTH_MISSING_TOKEN",
				field: null,
				message: "Authorization token is missing or malformed"
			}
		]);
		next(error);
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded: { id: string; type: string } = jwt.verify(
			token,
			process.env.SECRETE_KEY || "secret-key"
		);

		(req as any).user = decoded;
		next();
	} catch (err: any) {
		const error = new AppError("Invalid or expired token", 403, [
			{
				code: "AUTH_INVALID_TOKEN",
				field: null,
				message: err.message || "Token verification failed"
			}
		]);
		next(error);
	}
};
