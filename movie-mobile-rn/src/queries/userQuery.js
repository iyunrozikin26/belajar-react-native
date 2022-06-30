import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Mutation($input: userInput) {
        userLogin(input: $input) {
            _id
            email
            access_token
        }
    }
`;

export const GET_USER = gql`
    query Query($userId: String) {
        user(id: $userId) {
            _id
            firstName
            lastName
            email
            address
            phoneNumber
        }
    }
`;
