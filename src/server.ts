import * as path from "path";
import * as http from "http";
import * as express from "express";
import {config} from "dotenv";
import {ApolloServer} from "apollo-server-express";
import {loadFilesSync} from "@graphql-tools/load-files";
import {makeExecutableSchema} from "@graphql-tools/schema";

// Load environment variables
config({path: path.join(__dirname, "../.env")});

// Load database connection file
import {AppDataSource} from "./data-source";

// Load typeDefs and resolvers files
const resolvers = loadFilesSync(path.join(__dirname, "resolvers/**/*.{js,ts}"));
const typeDefs = loadFilesSync(path.join(__dirname, "typeDefs/**/*.graphql"));

// Make executable schema
const schema = makeExecutableSchema({typeDefs, resolvers});

export const startApolloServer = async () => {
	// Await connection to database
	await AppDataSource.initialize();
	
	// Create express app and server
	const app = express();
	const httpServer = http.createServer(app);
	
	// Create apollo server
	const server = new ApolloServer({schema});
	
	// start server
	await server.start();
	server.applyMiddleware({app});
	
	await new Promise<void>((resolve) =>
		httpServer.listen({port: 4000}, resolve)
	);
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
