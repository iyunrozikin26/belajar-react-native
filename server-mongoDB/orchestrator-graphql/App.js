require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const userSchema = require("./schemas/userSchema");
const movieSchema = require("./schemas/movieSchema");

const server = new ApolloServer({
    typeDefs: [movieSchema.typeDefs, userSchema.typeDefs],
    resolvers: [movieSchema.resolvers, userSchema.resolvers],
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Apollo ready at ${url}`);
});
