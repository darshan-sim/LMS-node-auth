export enum UserType {
	ADMIN,
	MANAGER,
	USER
}

export class User {
	private static users: User[] = [];
	private static idCounter: number = 1;

	public id: string;

	constructor(
		public username: string,
		public password: string,
		public type: UserType
	) {
		this.id = (User.idCounter++).toString();
	}

	static findAll() {
		return User.users;
	}
	static findById(id: string) {
		return User.users.find((user) => user.id === id);
	}
	add() {
		const length = User.users.length;
		// User.users = User.users.filter((user) => user.id !== id);
		User.users.push(this);
		return length - User.users.length;
	}
	static deleteById(id: string): number {
		const length = User.users.length;
		User.users = User.users.filter((user) => user.id !== id);
		return length - User.users.length;
	}
	static update(updatedUser: Pick<User, "id" | "type">) {
		const user = User.findById(updatedUser.id);
		if (user) {
			user.type = updatedUser.type;
			return user;
		}
	}
	static findByUsername(username: string) {
		return User.users.find((user) => user.username === username);
	}
}
