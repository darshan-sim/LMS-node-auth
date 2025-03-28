import { User, UserType } from "../models/user";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class AuthService {
	static async register(username: string, password: string, type: UserType) {
		const duplicates = User.findByUsername(username);
		if (duplicates) {
			return {
				message: "User name already exists"
			};
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User(username, hashedPassword, type);
		user.add();
		return {
			message: "User created successfully",
			user: { id: user.id, username: user.username, type: user.type }
		};
	}

	static async login(username: string, password: string, secretKey: string) {
		const user = User.findByUsername(username);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			throw new Error("Invalid credentials");
		}
		const token = jwt.sign({ id: user.id, type: user.type }, secretKey, {
			expiresIn: "1h"
		});

		return { message: "User Login successfully", token };
	}
}
