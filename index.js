const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("graphql-tag");

const typeDefs = gql`
    input UserInput {
        firstName: String!
        lastName: String!
        businessPhone: String!
        email: String!
        jobTitle: String
    }

    type User {
        firstName: String!
        lastName: String!
        businessPhone: String!
        email: String!
        jobTitle: String
    }

    type Mutation {
        updateUser(user: UserInput!): User!
    }

    type Query {
        hello: String
    }
`;

// Define the resolvers
const resolvers = {
	Query: {
		hello: () => "Hello, world!",
	},
	Mutation: {
		updateUser: (_, { user }) => {
			console.log("Received user input:", user);

			return {
				firstName: user.firstName,
				lastName: user.lastName,
				businessPhone: user.businessPhone,
				email: user.email,
				jobTitle: user.jobTitle || null,
			};
		},
	},
};

// Create and start the Apollo Server
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Start the standalone server
startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
