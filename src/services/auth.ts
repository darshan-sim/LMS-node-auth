import { AppError } from "../errors/AppError";
import { User, UserType } from "../models/user";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class AuthService {
	static async register(username: string, password: string, type: UserType) {
		const existingUser = User.findByUsername(username);
		if (existingUser) {
			throw new AppError("Validation failed", 400, [
				{
					code: "VALIDATION_DUPLICATE_USERNAME",
					field: "username",
					message: "Username already exists"
				}
			]);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User(username, hashedPassword, type);
		const rows = user.add();
		if (rows <= 0) {
			throw new AppError("User creation failed", 500, [
				{
					code: "DATABASE_INSERT_FAILED",
					field: "user",
					message: "Failed to create the user. Please try again."
				}
			]);
		}

		return {
			user: { id: user.id, username: user.username, type: user.type }
		};
	}

	static async login(username: string, password: string, secretKey: string) {
		const user = User.findByUsername(username);

		if (!user) {
			throw new AppError("Authentication failed", 401, [
				{
					code: "AUTH_INVALID_CREDENTIALS",
					field: "credentials",
					message: "Invalid username or password"
				}
			]);
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw new AppError("Authentication failed", 401, [
				{
					code: "AUTH_INVALID_CREDENTIALS",
					field: "credentials",
					message: "Invalid username or password"
				}
			]);
		}

		const token = jwt.sign({ id: user.id, type: user.type }, secretKey, {
			expiresIn: "1h"
		});

		return {
			token
		};
	}
}
