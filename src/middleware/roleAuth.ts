import { NextFunction, Request, Response } from "express";

export const authorizedRoles = (...allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const user = (req as any).user as { id: string; type: string } | undefined;
		if (!user) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}
		if (!allowedRoles.includes(user.type.toUpperCase())) {
			res.status(403).json({ message: "Forbidden: Insufficient privileges" });
			return;
		}
		next();
	};
};

export const authorizeSelfOrRole = (...allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const user = (req as any).user as { id: string; type: string } | undefined;
		const { id } = req.params;
		if (!user) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}
		if (allowedRoles.includes(user.type.toUpperCase()) || user.id === id) {
			next();
			return;
		}
		res.status(403).json({ message: "Forbidden: Insufficient privileges" });
		return;
	};
};
