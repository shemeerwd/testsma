
import client from "../../helpers/feathers";
import { catchHandler } from "../../helpers/error-handler";
import config from "../../../config";
import {generateRandomKey} from "../../helpers"

export function registerTokens(data) {
    data._csrf = generateRandomKey();
    data.origin = "delivery";
    return client().service(config.routes.notification).create(data).catch(catchHandler)
}
export function login(data) {
    data._csrf = generateRandomKey();
    data.origin = "delivery";
    return client().service(config.routes.authentication).create(data).catch(catchHandler)
}
export function forgotPassword(data){
    data._csrf = generateRandomKey();
    data.origin = "delivery";
    return client().service(config.routes.forgotPassword).create(data).catch(catchHandler)
}
export function resetPassword(data){
    data._csrf = generateRandomKey();
    data.origin = "delivery";
    return client().service(`${config.routes.resetPassword}/${data.resetToken}`).create(data).catch(catchHandler)
}

export function updateProfile(data) {
    data._csrf = generateRandomKey();
    data.origin = "delivery";
    return client().service(config.routes.users).patch(data._id, data).catch(catchHandler)
}




