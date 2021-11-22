import axios from "axios";
import jwt from "jsonwebtoken";

const SECRET_KEY = "123456789";
const expiresIn = "3h";

export const loginApi = async (username, password) => {
    // Ma hoa mat khau gui len api
    // pass = md5(`${KEY_JWT}|||${pass}`);

    const response = await axios({
        url: `http://localhost:8000/auth/login`,
        method: "POST",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Content-type": "Application/json",
            Authorization: `Bearer ${getTokenToLocalStorage()}`,
        },
        data: {
            username,
            password,
        },
    });

    const result = (await response.status) === 200 ? await response.data : {};

    return result;
};

export const setTokenLocalStorage = (token) => {
    if (token !== undefined && token !== null && token !== "") {
        localStorage.setItem("token", token);
    }
};

export const getTokenToLocalStorage = () => {
    const token = localStorage.getItem("token");

    if (token !== undefined && token !== null && token !== "") {
        return token;
    }

    return null;
};

export const decodeTokenFormLocalStorage = () => {
    const token = getTokenToLocalStorage();
    let decodeToken = null;
    if (token !== undefined && token !== null && token !== "") {
        decodeToken = jwt.verify(token, SECRET_KEY);
    }

    return decodeToken;
};

export const removeTokenLocalStorage = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    const token = decodeTokenFormLocalStorage();
    if (token !== undefined && token !== null && token !== "") {
        return true;
    }
    return false;
};
