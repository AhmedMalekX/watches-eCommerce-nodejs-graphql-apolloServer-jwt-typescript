import * as path from "path";
import {ApolloServer} from "apollo-server-express";
import * as express from "express";
import * as http from "http";
import {loadFilesSync} from "@graphql-tools/load-files";
import {makeExecutableSchema} from "@graphql-tools/schema";

// Load typeDefs and resolvers files
const resolvers = loadFilesSync(path.join(__dirname, "resolvers/**/*.{js,ts}"));
const typeDefs = loadFilesSync(path.join(__dirname, "typeDefs/**/*.graphql"));

// Make executable schema
const schema = makeExecutableSchema({typeDefs, resolvers});

export const startApolloServer = async () => {
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
