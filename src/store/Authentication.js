const currentUserKey = "current-user";

function setToken(token) {
    localStorage.setItem('token', token.idToken);
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('expiresIn', token.expiresIn + new Date().getTime() / 1000);
    localStorage.setItem('refreshToken', token.refreshToken);
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function setAccessToken(accessToken) {
    return localStorage.setItem('accessToken', accessToken);
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

function removeToken() {
    localStorage.removeItem('accessToken');
}


function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
}

function setCurrentUser(currentUser) {
    localStorage.setItem(currentUserKey, JSON.stringify(currentUser));
}

function getCurrentUser() {
    return localStorage.getItem(currentUserKey);
}

function removeCurrentUser() {
    localStorage.removeItem(currentUserKey);
}

function isAuthenticated() {
    return getAccessToken() !== undefined && getAccessToken() !== null;
}

let Auth = {
    setToken: setToken,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser,
    getAccessToken: getAccessToken,
    getRefreshToken: getRefreshToken,
    isAuthenticated: isAuthenticated,
    setAccessToken: setAccessToken,
    logout() {
        removeToken();
        removeCurrentUser();
        removeRefreshToken();
    }
};
export default Auth;
