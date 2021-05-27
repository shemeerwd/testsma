// import notification from "../../components/notification";
import { getReport } from "./service";

export default {
    state: {
        loading: false,
        saleReports:{}
    },
    reducers: {
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },
        onError(state,data ) {
            //   notification("error","error");
            return {
                ...state,
                loading: false
            };
        },
        onGetReportSuccess(state, data ) {
            return {
                ...state,
                loading: false,
                saleReports:data
            };
        },
    },
    effects: {
        getReport: async function(payload, rootState) {
            this.onRequest();
            try {
                let res = await getReport(payload);
                this.onGetReportSuccess(res);
            } catch (e) {
                console.log(e)
                this.onError(e);
            }
        },
    }
};
