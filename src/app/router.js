import React, { Component } from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import asyncComponent from "./helpers/async-func";
import Layout from "./components/layout";
import { getJsonCookies } from "../app/helpers/utility";

const RestrictedRoute = ({component: Component,layoutSettings = {}, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            getJsonCookies() ? (
                <Layout settings={layoutSettings}>
                    <Component {...props} settings={layoutSettings} />
                </Layout>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const UnRestrictedRoute = ({ component: Component,layoutSettings = {}, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !getJsonCookies() ? (
                <Component {...props} settings={layoutSettings}  />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default class extends Component {

    render() {
        const { history } = this.props;

        return (
            <Router history={history}>
                <Switch>

                    <UnRestrictedRoute
                        exact
                        path={"/login"}
                        layoutSettings={{
                            title: "Login",
                        }}
                        component={asyncComponent(() => import("./containers/user/login"))}
                    />
      
                    <UnRestrictedRoute
                        exact
                        path={"/forgot-password"}
                        layoutSettings={{
                            title: "Forgot password",
                        }}
                        component={asyncComponent(() => import("./containers/user/forgot"))}
                    />
                    <UnRestrictedRoute
                        exact
                        path={"/reset-password/:token"}
                        component={asyncComponent(() => import("./containers/user/reset"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/"}
                        layoutSettings={{
                            title: "New Orders",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/orders/new"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/my-profile"}
                        layoutSettings={{
                            title: "My Profile",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/my-profile"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/new-orders"}
                        layoutSettings={{
                            title: "New Orders",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/orders/new"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/assigned-orders"}
                        layoutSettings={{
                            title: "Assigned Orders",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/orders/assigned"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/navigation"}
                        layoutSettings={{
                            title: "",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/side-bar"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/past-orders"}
                        layoutSettings={{
                            title: "Past Orders",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/orders/completed"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/order/tracking/:id"}
                        layoutSettings={{
                            title: "Order Tracking",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/orders/tracking"))}
                    />
                    <RestrictedRoute
                        exact
                        path={"/reports"}
                        layoutSettings={{
                            title: "Reports",
                            topbar:true,
                            sidebar:false
                        }}
                        component={asyncComponent(() => import("./containers/reports"))}
                    />
                      
                    <Route
                        component={asyncComponent(() => import("./containers/not-found"))}
                    />
                </Switch>
            </Router>
        );
    }
}
