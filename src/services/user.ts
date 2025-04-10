import { User, UserType } from "../models/user";
import { AppError } from "../errors/AppError";

export class UserService {
	static getUser(id: string) {
		const user = User.findById(id);
		if (!user) {
			throw new AppError("User not found", 404, [
				{
					code: "USER_NOT_FOUND",
					field: "id",
					message: `No user found with id: ${id}`
				}
			]);
		}
		return {
			message: "User found",
			user: convertToUser(user)
		};
	}

	static deleteUser(id: string) {
		const row = User.deleteById(id);
		if (row > 0) {
			return { message: "User deleted successfully" };
		}
		throw new AppError("Unable to delete user", 404, [
			{
				code: "USER_NOT_FOUND",
				field: "id",
				message: `User with id: ${id} does not exist`
			}
		]);
	}

	static getAllUsers() {
		const users = User.findAll();
		if (users.length <= 0) {
			throw new AppError("No users found", 404, [
				{
					code: "NO_USERS",
					field: "users",
					message: "No users are registered in the system"
				}
			]);
		}
		return {
			message: `${users.length} users found`,
			users: users.map(convertToUser)
		};
	}

	static updateUser(id: string, type: UserType) {
		const user = User.update({ id, type });
		if (!user) {
			throw new AppError("Unable to update user", 404, [
				{
					code: "USER_NOT_FOUND",
					field: "id",
					message: `No user found with id: ${id}`
				}
			]);
		}
		return {
			message: "User updated successfully",
			user: convertToUser(user)
		};
	}
}

type userResponse = {
	id: string;
	username: string;
	type: UserType;
};

const convertToUser = (user: User): userResponse => ({
	id: user.id,
	username: user.username,
	type: user.type
});
