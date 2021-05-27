import client from "../../helpers/feathers";
import { catchHandler } from "../../helpers/error-handler";
import config from "../../../config";
import {getUserDetatils} from "../../helpers/utility"

export function getReport(data) {
    return client().service(config.routes.reports).create({}, {
        query: {
            period: data.filter,
            userId:getUserDetatils() ? getUserDetatils()._id : ""
        }
    }).catch(catchHandler)
}

