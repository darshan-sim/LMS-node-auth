import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const verifyJWT = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (!req.headers.authorization) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		res.status(401).send({ message: "Access Denied. No token provided." });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRETE_KEY!) as {
			id: string;
			type: string;
		};
		(req as any).user = decoded; //I don't like this solution
		next();
	} catch (error: any) {
		res
			.status(403)
			.send({ message: `Invalid or expired token. ${error.message}` });
		return;
	}
};
