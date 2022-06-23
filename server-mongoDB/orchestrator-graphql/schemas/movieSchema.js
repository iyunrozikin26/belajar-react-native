const { gql } = require("apollo-server");
const axios = require("axios");
const MOVIES_URL = "http://localhost:3001/movies";
const USERS_URL = "http://localhost:8080/users";

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Movie {
        id: ID
        title: String
        synopsis: String
        imgUrl: String
        GenreId: Int
        rating: String
        AuthorMongoId: String
        user: User
    }

    type Query {
        movies: [Movie]
        selectedMovie(id: ID): Movie
    }

    input MovieInput {
        title: String
        slug: String
        imgUrl: String
        synopsis: String
        trailerUrl: String
        rating: String
        price: String
        GenreId: Int
        AuthorMongoId: String!
    }

    type Mutation {
        createMovie(input: MovieInput): Movie
        editMovie(id: ID, input: MovieInput): Movie
        deleteMovie(id: ID): Movie
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const { data: allMovies } = await axios({
                    method: "get",
                    url: MOVIES_URL,
                });
                return allMovies.rows;
            } catch (error) {
                console.log(error);
            }
        },

        selectedMovie: async (_, args) => {
            try {
                const { data: movie } = await axios({
                    method: "get",
                    url: `${MOVIES_URL}/${args.id}`,
                });
                const { data: user } = await axios({
                    method: "get",
                    url: `${USERS_URL}/${movie.AuthorMongoId}`,
                });
                return { ...movie, user };
            } catch (error) {
                console.log(error);
            }
        },
    },

    Mutation: {
        createMovie: async (_, args) => {
            try {
                const { data: newMovie } = await axios({
                    method: "post",
                    url: MOVIES_URL,
                    data: args.input,
                });
                return newMovie;
            } catch (error) {
                console.log(error);
            }
        },
        editMovie: async (_, args) => {
            try {
                const { data: movieUpdate } = await axios({
                    method: "patch",
                    url: `${MOVIES_URL}/${args.id}/edit`,
                    data: args.input,
                });
                return movieUpdate[1][0];
            } catch (error) {
                console.log(error);
            }
        },
        deleteMovie: async (_, args) => {
            try {
                const { data: deleted } = await axios({
                    method: "delete",
                    url: `${MOVIES_URL}/${args.id}/delete`,
                });
                console.log(deleted);
                return deleted;
            } catch (error) {
                console.log(error);
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};
