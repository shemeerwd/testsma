import React, { Component } from "react";
import { Provider } from "react-redux";
import { store, history } from "./store";
import { Offline } from "react-detect-offline";
import Routes from "./router";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Offline>No internet connection</Offline>
                <Routes history={history} coords={this.props.coords} />
            </Provider>
        );
    }
}

// export default geolocated({
//     positionOptions: {
//         enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
// })(App);


export default App
