import {User} from "../entity/User";
import {ObjectID} from "mongodb";

export default {
	Query: {
		hello: () => "Hello there!",
		user: async (_, {id}) => {
			// Create MongoDB objectID -> because normal id has different type than mongodb objectId
			const _id = new ObjectID(id)
			
			const user = await User.findOne<any>({where: {_id}});
			// const user = await AppDataSource.mongoManager.findOneBy(User, {_id: id} as any);
			
			console.log(id);
			
			if (!user) {
				throw new Error("User not found!");
			}
			
			return user;
		},
		users: async () => {
			const users = await User.find();
			
			if (!users) {
				throw new Error("Not Found!");
			}
			
			return users;
		},
	},
	
	Mutation: {
		register: async (
			_,
			{
				email,
				password,
				firstName,
				lastName,
			}: {
				email: string;
				password: string;
				firstName: string;
				lastName: string;
			}
		) => {
			console.log(email, password);
			
			if (!email || !password) {
				throw new Error("Please Provide Email and Password!");
			}
			
			const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			
			if (!email.match(validEmail)) {
				throw new Error("Please Provide a valid Email Address");
			}
			
			await User.insert({email, password, firstName, lastName});
			
			return {
				ok: true,
			};
		},
	},
};
