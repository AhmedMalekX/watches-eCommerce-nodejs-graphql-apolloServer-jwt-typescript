import {DataSource} from "typeorm";
import {User} from "./entity/User";

console.log(process.env.DATABASE_HOST)

export const AppDataSource = new DataSource({
	type: "mongodb",
	port: 5432,
	synchronize: true,
	logging: true,
	entities: [User],
	subscribers: [],
	migrations: [],
	useUnifiedTopology: true,
	url: `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
})