import { SET_MOVIES, SET_SEARCH, SET_SINGLE_MOVIE, GET_GENRES,SET_OPEN_MOVIES } from "../types/movieType";

const initialState = {
    filter: "",
    movies: [],
    selected: {},
    genres: [],
    open:false
};

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_MOVIES:
            return { ...state, movies: payload };
        case SET_SEARCH:
            return { ...state, filter: payload };
        case SET_SINGLE_MOVIE:
            return { ...state, selected: payload };
        case GET_GENRES:
            return { ...state, genres: payload };
        case SET_OPEN_MOVIES:
            return { ...state, open: payload };
        default:
            return state;
    }
};

export default movieReducer;
