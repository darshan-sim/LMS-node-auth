export interface UserInterface {
	id: string;
	username: string;
	password: string;
	type: string;
}

export const convertToUser = (
	user: UserInterface
): Omit<UserInterface, "password"> => {
	return {
		id: user.id,
		username: user.username,
		type: user.type
	};
};
