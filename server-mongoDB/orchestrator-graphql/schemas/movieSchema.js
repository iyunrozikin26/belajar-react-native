const { gql } = require("apollo-server");
const axios = require("axios");
const MOVIES_URL = "http://localhost:3001/movies";
const USERS_URL = "http://localhost:8080/users";

const Redis = require("ioredis");

// const redis = new Redis()
const redis = new Redis({
    port: 14648,
    host: "redis-14648.c1.asia-northeast1-1.gce.cloud.redislabs.com",
    password: `${process.env.REDIS_LAB_PASS}`,
    username: "default",
});

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
    }
    type Genre {
        id: ID
        name: String
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
        genres: [Genre]
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
                const cacheMovies = await redis.get("movies");
                if (cacheMovies) {
                    return JSON.parse(cacheMovies);
                } else {
                    const { data: allMovies } = await axios({
                        method: "get",
                        url: MOVIES_URL,
                    });
                    const { data: users } = await axios.get(USERS_URL);

                    allMovies.rows.forEach((movie) => {
                        users.forEach((user) => {
                            if (movie.AuthorMongoId == user._id) {
                                movie.user = user;
                            }
                        });
                    });

                    await redis.set("movies", JSON.stringify(allMovies.rows));
                    return allMovies.rows;
                }
            } catch (error) {
                console.log(error);
            }
        },
        genres: async () => {
            try {
                const cacheGenres = await redis.get("genres");
                if (cacheGenres) {
                    return JSON.parse(cacheGenres);
                } else {
                    const { data: allGenre } = await axios({
                        method: "get",
                        url: `${MOVIES_URL}/genre`,
                    });

                    await redis.set("genres", JSON.stringify(allGenre));
                    return allGenre;
                }
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
                console.log(movie);
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
                if (newMovie) {
                    await redis.del("movies");
                    return newMovie;
                }
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
                if (movieUpdate) {
                    await redis.del("movies");
                    return movieUpdate[1][0];
                }
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
                if (deleted) {
                    await redis.del("movies");
                    return deleted;
                }
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
