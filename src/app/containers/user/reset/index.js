import React, { Component } from "react";
import { connect } from "react-redux";
import ResetForm from "./reset-form";
import { Link } from "react-router-dom";
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

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(data) {
        data.resetToken = this.props.match.params.token
        console.log(data)
        return this.props.resetPassword(data);
    }
   
    render() {
        return (
            <div className="auth-bg signup-wrapp">
                <div className="auth-wrapper" elevation={4} >
                    <div className="auth-wrapper-inner">
                        <Row>
                            <Col span={24} sm={12}>
                                <div className="auth-header">
                                    <Link to="#" className="auth-header-logo back-link"> 
                                        <i className="icon-arrow-left"></i>Signup
                                    </Link>
                                </div>

                                <div className="auth-banner-block">
                                    <div className="auth-logo">
                                        <img className="inline" src="/images/logo.svg" alt="logo"/>
                                    </div>
                                    <div className="banner-image">
                                        <img className="inline" src="/images/auth-banner.png" alt="banner"/> 
                                    </div>
                                </div>
                
                                <div className="bottom-link-block web-view">
                                    <span className="concatinate-text">Have an account?</span>
                                    <Link to="/login" className="auth-header-logo forward-link">Login</Link> 
                                </div>
                            </Col>
                            <Col span={24} sm={12}>
                                <div className="auth-form-block">
                                    <ResetForm onSubmit={this.handleSubmit} loading={this.props.loading} /> 
                                    <div className="bottom-link-block mobile-view">
                                        <span className="concatinate-text">Have an account?</span>
                                        <Link to="/login" className="auth-header-logo forward-link">Login</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
