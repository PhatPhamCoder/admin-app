const getTokenfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const config = {
    headers: {
        "Content-type": "Application/json",
        "Authorization": `Bearer ${getTokenfromLocalStorage.token}`
    },
};