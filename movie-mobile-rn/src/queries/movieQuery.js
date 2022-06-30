import { gql } from "@apollo/client";

export const GET_GENRES = gql`
    query Query {
        genres {
            id
            name
        }
    }
`;

export const GET_ALL_MOVIES = gql`
    query Query {
        movies {
            id
            title
            synopsis
            imgUrl
            GenreId
            rating
            AuthorMongoId
            user {
                firstName
                lastName
                email
            }
        }
    }
`;

export const SELECTED_MOVIE = gql`
    query Query($selectedMovieId: ID) {
        selectedMovie(id: $selectedMovieId) {
            id
            title
            synopsis
            imgUrl
            GenreId
            rating
            AuthorMongoId
            user {
                firstName
                lastName
                email
            }
        }
    }
`;
