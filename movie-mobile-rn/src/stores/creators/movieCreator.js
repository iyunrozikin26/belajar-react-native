import axios from "axios";
import { SET_MOVIES, SET_SEARCH, SET_SINGLE_MOVIE, GET_GENRES } from "../types/movieType";

const MOVIES_URL = "http://localhost:3001/movies";
const usersUrl = "http://localhost:8080/users";

export const setMovies = (payload) => {
    return { type: SET_MOVIES, payload };
};
export const setSearch = (payload) => {
    return { type: SET_SEARCH, payload };
};
export const setSingleMovie = (payload) => {
    return { type: SET_SINGLE_MOVIE, payload };
};
export const setGenres = (payload) => {
    return { type: GET_GENRES, payload };
};
export const setOpenMovies = (payload) => {
    return { type: GET_GENRES, payload };
};

// HIT ROUTE IN SERVER
export const getGenres = () => {
    return (dispatch) => {
        axios({
            method: "get",
            url: MOVIES_URL + "/genre",
        })
            .then(({ data }) => {
                dispatch(setGenres(data));
            })
            .catch((err) => console.log(err));
    };
};

export const getAllMovies = (genre) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: "http://localhost:3001/movies",
        })
            .then(({ data }) => {
                let filtered = data.rows.filter((mov) => {
                    return mov.GenreId == genre;
                });
                dispatch(setMovies(filtered));
            })
            .catch((err) => console.log(err));
    };
};

export const getSingleMovie = (movieId) => {
    return async (dispatch) => {
        try {
            const { data: movies } = await axios({
                method: "get",
                url: `${MOVIES_URL}/${movieId}`,
            });
            const { data: user } = await axios({
                method: "get",
                url: `${usersUrl}/${movies.AuthorMongoId}`,
            });
            dispatch(
                setSingleMovie({
                    ...movies,
                    user,
                })
            );
        } catch (error) {
            console.log(error);
        }
        // axios({
        //     method: "get",
        //     url: `${MOVIES_URL}/${movieId}`,
        // })
        //     .then(({ data }) => {
        //         console.log(data);
        //         dispatch(setSingleMovie(data));
        //     })
        //     .catch((err) => console.log(err));
    };
};
