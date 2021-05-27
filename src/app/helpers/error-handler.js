import { history } from "../store";
import {clearCookies } from "./utility";

export function catchHandler(e) {
    let res = JSON.parse(JSON.stringify(e));
    if (res.code === 401) {
        clearCookies()
        history.push("/login");
    }
    throw res;
}

