import Cookies from "js-cookie";
import config from "../../config";

const cookies = config.cookies;

export function clearCookies() {
    Cookies.remove(cookies.name);
}

export function setCookies(data) {
    try {
        let cookie = {};
        if (data.accessToken) cookie.authKey = data.accessToken;
        if (data.user.email) cookie.email = data.user.email;
        if (data.user.name) cookie.name = data.user.name;
        if (data.user.phoneNumber) cookie.phoneNumber = data.user.phoneNumber;
        if (data.user._id) cookie._id = data.user._id;
        if (data.user.restaurantId) cookie.restId = data.user.restaurantId

        Cookies.set(cookies.name, cookie, { expires: cookies.expiry });
    } catch (e) {
        console.log("set cookie err", e);
    }
}

export function updateCookie(data) {
    let token = Cookies.getJSON(cookies.name);
    if (data.email) token.email = data.email;
    if (data.name) token.name = data.name;
    if (data.phoneNumber) token.phoneNumber = data.phoneNumber;
    if (data.restaurantId) token.restaurantId = data.restaurantId
    Cookies.set(cookies.name, token, { expires: cookies.expiry });
}

export function getCookies() {
    return Cookies.get(cookies.name);
}

export function getJsonCookies() {
    let token = Cookies.getJSON(cookies.name);
    if (token) return token.authKey;
}

export function getUserDetatils() {
    let token = Cookies.getJSON(cookies.name);
    if (token) return token;
}

export function getCookie() {
    let token = Cookies.getJSON(cookies.name);
    if (token) return token;
}
