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
