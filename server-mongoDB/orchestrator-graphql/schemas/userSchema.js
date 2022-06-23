const axios = require("axios");
const { gql } = require("apollo-server");
const USERS_URL = "http://localhost:8080/users";

const typeDefs = gql`
    type isRegister {
        _id: ID
        email: String
    }

    type isLogin {
        _id: ID
        email: String
        access_token: String
    }

    type User {
        _id: ID
        username: String
        email: String
        address: String
        phoneNumber: String
    }

    input newUser {
        username: String
        email: String
        password: String
        phoneNumber: String
        address: String
    }

    input userInput {
        email: String
        password: String
    }

    type Query {
        users: [User]
    }
    type Mutation {
        userRegister(input: newUser): isRegister
        userLogin(input: userInput): isLogin
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            try {
                const { data: users } = await axios.get(USERS_URL);
                return users;
            } catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        userRegister: async (_, args) => {
            try {
                const { data: registered } = await axios({
                    method: "post",
                    url: `${USERS_URL}/register`,
                    data: args.input,
                });
                return registered;
            } catch (error) {
                console.log(error);
            }
        },

        userLogin: async (_, args, context) => {
            try {
                const { data: isLogin } = await axios({
                    method: "post",
                    url: `${USERS_URL}/login`,
                    data: args.input,
                });
                context = {
                    access_token: isLogin.access_token,
                };
                console.log(context);
                return isLogin;
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
