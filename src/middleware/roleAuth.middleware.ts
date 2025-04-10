import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const authorizedRoles = (...allowedRoles: string[]) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const user = (req as any).user as { id: string; type: string } | undefined;

		if (!user) {
			throw new AppError("Unauthorized", 401, [
				{
					code: "AUTH_UNAUTHORIZED",
					field: null,
					message: "User not authenticated"
				}
			]);
		}
		if (!allowedRoles.includes(user.type.toUpperCase())) {
			throw new AppError("Forbidden", 403, [
				{
					code: "AUTH_FORBIDDEN",
					field: null,
					message: "Insufficient privileges to access this resource"
				}
			]);
		}
		next();
	};
};

export const authorizeSelfOrRole = (...allowedRoles: string[]) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const user = (req as any).user as { id: string; type: string } | undefined;
		const { id } = req.params;

		if (!user) {
			throw new AppError("Unauthorized", 401, [
				{
					code: "AUTH_UNAUTHORIZED",
					field: null,
					message: "User not authenticated"
				}
			]);
		}

		if (allowedRoles.includes(user.type.toUpperCase()) || user.id === id) {
			next();
			return;
		}

		throw new AppError("Forbidden", 403, [
			{
				code: "AUTH_FORBIDDEN",
				field: "id",
				message: "You are not allowed to access this resource"
			}
		]);
	};
};
