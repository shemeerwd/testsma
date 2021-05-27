import React, {Component} from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = { currentYear: moment().format("YYYY") };
    }
    render() {
        return (
            <footer className="main-footer">
                <div className="footer-top-block"> 
                    <div className="container">
                        <div className="content-block">
                            <Link to={"/"} className="logo-block">
                                <img src="/images/foot-logo.svg" alt=""/>
                            </Link>  
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-block"> 
                    <div className="container">
                        <div className="content-block">
                            <span className="bottom-text">© Eat IT IN Delivery</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
