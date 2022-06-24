import axios from "axios";

module.exports = {
    setToken: async (token) => {
        localStorage.setItem("Token", token);
        axios.defaults.headers.common["Authorization"] = `${token}`;
    },
    getToken: async () => {

        const AccessToken = localStorage.getItem("user");
        axios.defaults.headers.common["Authorization"] = `${AccessToken.token}`;
        return AccessToken;
    },
    removeToken: async () => {
        localStorage.removeItem("Token");
    },
    refreshToken: async () => {
        const AccessToken = localStorage.getItem("Token");
        if (AccessToken) {
            axios.defaults.headers.common["Authorization"] = `${AccessToken}`;
            return AccessToken;
        }

    }
}
// Language: javascript