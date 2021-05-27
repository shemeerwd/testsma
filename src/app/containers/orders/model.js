// import notification from "../../components/notification";
import { newOrders,aceeptedOrders,deliveredOrders,handleOrders,getOrder,getOrderStatus } from "./service";

export default {
    state: {
        loading: false,
        neworders:[],
        acceptedorders:{},
        orders:{},
        order:{},
        orderStatus:[]
    },
    reducers: {
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },
        onError(state,data ) {
            // notification("error","Some error occured");
            return {
                ...state,
                loading: false
            };
        },
        onNewOrderSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                neworders:data
            };
        },
        onAcceptedOrderSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                acceptedorders:data
            };
        },
        onDeliveredOrdersSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                orders:data
            };
        },
        onGetOrderSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                order:data
            };
        },
        onGetOrderStatusSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                orderStatus:data.data
            };
        },
        onHandleOrdersuccess(state, data ) {
            return {
                ...state,
                loading: false
            };
        },
    },
    effects: {
        newOrders: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await newOrders(payload);
                this.onNewOrderSuccess(res);
            } catch (e) {
                this.onError();
            }
        },
        aceeptedOrders: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await aceeptedOrders(payload);
                this.onAcceptedOrderSuccess(res);
            } catch (e) {
                this.onError();
            }
        },
        deliveredOrders: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await deliveredOrders(payload);
                this.onDeliveredOrdersSuccess(res);
            } catch (e) {
                this.onError();
            }
        },
        getOrder: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await getOrder(payload);
                this.onGetOrderSuccess(res);
            } catch (e) {
                this.onError();
            }
        },
        getOrderStatus: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await getOrderStatus(payload);
                this.onGetOrderStatusSuccess(res);
            } catch (e) {
                this.onError();
            }
        },
        handleOrders: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await handleOrders(payload);
                this.newOrders();
                this.aceeptedOrders();
                this.onHandleOrdersuccess(res);
            } catch (e) {
                console.log(e)
                this.onError();
            }
        }
    }
};
