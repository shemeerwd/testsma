import notification from "../../components/notification";
import { clearCookies,getCookie,setCookies,updateCookie } from "../../helpers/utility";
import * as service from "./service";
import {capitalize} from "../../helpers";

export default {
    state: {
        user: getCookie() || {},
    },
    reducers: {
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },
        onError(state, data) {
            notification("error", data.message &&  data.message.length ?  capitalize(data.message) : "Unauthorized access" );
            return {
                ...state,
                loading: false
            };
        },
        onLoginSuccess(state,data) {
            setCookies(data);
            return {
                ...state,
                loading: false,
                user: data.user,
            };
        },
        onRegisterSuccess(state,data) {
            setCookies(data);
            return {
                ...state,
                loading: false,
                user: data.user
            };
        },
        onLogoutSuccess(state) {
            return {
                ...state,
                loading: false,
                user:{}
            }
        },
        onForgetPasswordSuccess(state, { data }) {
            return {
                ...state,
                loading: false,
                resetAlertMsg: "We've sent you an email that will allow you to reset your password quickly and easily. If the email does not arrive within several minutes, be sure to check your spam or junk mail folders."
            };
        },
        onResetPasswordSuccess(state, { data }) {
            notification("success", "Password reset sucessfully");
            return {
                ...state,
                loading: false,
            };
        },
        onUpdateProfile(state, data) {
            notification("success", "profile updated sucessfully");
            updateCookie(data)
            return {
                ...state,
                loading: false,
                user: data
            }
        },
    },
    effects: {
        async login(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.login(payload);
                this.onLoginSuccess(res);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async logout() {
            await clearCookies();
            await localStorage.removeItem("acl");
            await this.onLogoutSuccess()
        },
    
        async forgotPassword(payload, rootState) {
            this.onRequest();
            try {
                let res =  await service.forgotPassword(payload)
                this.onForgetPasswordSuccess(res);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async resetPassword(payload, rootState) {
            this.onRequest();
            try {
                let res = await service.resetPassword(payload)
                this.onResetPasswordSuccess(res);
                return res;
            } catch (e) {
                this.onError(e);
            }
        },
        async updateProfile(data) {
            this.onRequest();
            try {
                let res = await service.updateProfile(data);
                this.onUpdateProfile(res);
                return res;
            } catch (e) {
                console.log("that err", e)
                this.onError(e);
            }
        },
    
    }
};
