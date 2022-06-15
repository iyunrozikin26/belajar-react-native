import axios from "axios";
import { SET_USERS } from "../types/userType";

const usersUrl = "http://localhost:3001/users";

export const setUsers = (payload) => {
    return { type: SET_USERS, payload };
};

export const Register = (user) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: usersUrl + "/register-cust",
                data: user,
            })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((err) => reject(err));
        });
    };
};

export const Login = (user) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: usersUrl + "/login",
                data: user,
            })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => reject(err));
        });
    };
};
