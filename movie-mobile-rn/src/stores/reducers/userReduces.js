import { SET_USERS } from "../types/movieType";

const initialState = {
    users: [],
};

const movieReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USERS:
            return { ...state, users: payload };
        default:
            return state;
    }
};

export default movieReducer;
