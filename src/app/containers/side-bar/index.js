import React , { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../../store";
import {Row, Col, Button} from "antd";

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

class SideBar extends Component {

    async logout() {
        await this.props.logout();
        history.push("/login");
    }
    handleRedirect(url) {
        history.push(url);
    }
    

    render() {
        const {user} = this.props;
        return (
            <Row type="flex" align="middle" className="account-nav-wrapper"> 
                <Col span={24} className="main-header">
                    <div className="cont ainer">
                        <div className="dark-banner-wrapper">
                            <div className="dark-banner-section">
                                <div className="content-block">
                                    <h3 className="title-text d-block">{user.name}</h3>
                                    <a href={`mailto:${user.email}`} className="sub-text"><span className="icon-mail icon-block"></span>{user.email}</a>
                                </div>
                                <div className="edit-block">
                                    <Button className="edit-btn" onClick={this.handleRedirect.bind(this,"/my-profile")}><span className="icon-pencil edit-icon"></span>Edit</Button>
                                </div>
                            </div>
                        </div> 
                        <div className="profile-dropdown-wrapper">
                            <div className="dropdown-body-wrapper">
                                <Link to={"/new-orders"}  className="link-item">
                                    <span className="icon-home link-icon"></span>  New Orders
                                </Link>
                                <Link to={"/assigned-orders"}  className="link-item">
                                    <span className="icon-food link-icon"></span>  Assigned Orders
                                </Link>
                                <Link to={"/past-orders"} className="link-item">
                                    <span className="icon-order-history link-icon"></span> Order History
                                </Link>
                                <Link to={"/reports"} className="link-item">
                                    <span className="icon-time link-icon"></span> Reports
                                </Link>
                                <Link to={""} onClick={this.logout.bind(this)} className="link-item last-item">
                                    <span className="icon-shut-down link-icon"></span> Signout
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
