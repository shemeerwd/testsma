import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import config from "../../config";
import axios from "axios";
import { getJsonCookies } from "./utility";

export default function () {
    let token = getJsonCookies();
    let opts = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    const client = feathers();
    return client.configure(rest(config.api.trim()).axios(axios, opts));
}
