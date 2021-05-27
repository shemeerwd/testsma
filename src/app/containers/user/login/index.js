import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./login-form";
import { history } from "../../../store";
import { Col, Row } from "antd";


const mapDispatchToProps = ({ user }) => {
    return {
        ...user
    };
};

const mapStateToProps = ({ user }) => {
    return {
        ...user
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(user) {

        await this.props.login(user);
        if(this.props.user && this.props.user._id) 
            history.push("/")
    }

    render() {
        return ( 
            <div className="auth-bg">
                <div className="auth-wrapper" elevation={4} > 
                    <div className="auth-wrapper-inner"> 
                        <Row>
                            <Col span={24} sm={12}>
                                <div className="auth-banner-block">
                                    <div className="auth-logo">
                                        <img className="inline" src="/images/logo.svg" alt="logo"/>
                                    </div>
                                    <div className="banner-image">
                                        <img className="inline" src="/images/auth-banner.png" alt="banner"/> 
                                    </div>
                                </div>
                            </Col>
                            <Col span={24} sm={12}>
                                <div className="auth-form-block">
                                    <LoginForm onSubmit={this.handleSubmit}  
                                        loading={this.props.loading} />  
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div> 
            </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
