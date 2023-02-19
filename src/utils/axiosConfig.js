export const getTokenfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const config = {
    headers: {
        "Authorization": `Bearer ${getTokenfromLocalStorage.token}`,
        "Content-type": "Application/json",
    },
};


//If Browser new can't login!~ run this code
// export const config = () => {
//     if (
//         JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//             .currentUser.accessToken
//     ) {
//         return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//             .currentUser.accessToken;
//     } else { return '' }
// };

