import client from "../../helpers/feathers";
import { catchHandler } from "../../helpers/error-handler";
import config from "../../../config";
import { getUserDetatils } from "../../helpers/utility";

export function newOrders(data) {
    return client().service(config.routes.delivery).find({
        query: {
            status: "new",
            userId:getUserDetatils()._id,
            $sort: { _id: 1 },
            $limit:data && data.limit ? data.limit : 20
        }
    }).catch(catchHandler)
}
export function aceeptedOrders(data) {
    return client().service(config.routes.delivery).find({
        query: {
            status: ["orderApproved","orderPickedUp","pending"],
            userId:getUserDetatils()._id,
            $sort: { updatedAt: -1 },
            $limit:data && data.limit ? data.limit : 20
        }
    }).catch(catchHandler)
}
export function deliveredOrders(data) {
    return client().service(config.routes.delivery).find({
        query: {
            status: "delivered",
            userId:getUserDetatils()._id,
            $sort: { updatedAt: -1 },
            $limit:data && data.limit ? data.limit : 20
        }
    }).catch(catchHandler)
}

export function handleOrders(data) {
    return client().service(config.routes.delivery).patch(data._id, data).catch(catchHandler)
}

export function getOrder(id) {
    return client().service(config.routes.orders).get(id).catch(catchHandler)
}

export function getOrderStatus(data) {
    return client().service(config.routes.orderStatus).find({query: data}).catch(catchHandler)
}






