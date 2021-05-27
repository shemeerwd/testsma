import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <main className="main-inner-wrapper">
                <div className="container">
                    <div className="block-outer bg-block t-center">
                        <div className="no-found">
                            <div className="item">
                                <h1>404</h1>
                                <div className="item-content">
                                    <h2>The page you requested was not found.</h2>
                                    <Link to="/"> Go Back </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default NotFound;
